import React, { Component } from 'react';
import * as _ from "lodash"
import List from '@material-ui/core/List';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';


import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip'

import { menuJson ,colorcodes} from "../../mock/menu"
import { ListItem, ListItemText } from '@material-ui/core';



const Dashboard = React.lazy(() => import("../DashBoard/Dashbaord"));

class MenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log(props);
    }
    componentDidMount() {
        let grouplist = _.groupBy(menuJson, "group")
        let subGrouplist = _.groupBy(menuJson, "subgroup")
        let obj = {};
        Object.keys(grouplist).map((key) => {
            let name = "group" + key;
            obj[name] = false;
        })
        Object.keys(subGrouplist).map((key) => {
            let name = "subgroup" + key;
            obj[name] = false;
        })

        this.setState(obj);
    }
    getMenuList = () => {
        let grouplist = _.groupBy(menuJson, "group")

        let obj = {};
        let { classes } = this.props;
        let listComp = [];
        let listItem=this.getListItem("Dashboard", "", { "group": "dashboard", "subgroup": "dashboard", "menu": "dashboard", "url": "/dashboard", "component": Dashboard, "icon": "dashboard" })
        if(listItem){
            listComp.push(listItem)
        }
        
        Object.keys(grouplist).map((key) => {
            let name = "group" + key;
            let listitem = this.getListItem(key, name, { "group": key });
            let subListComp = [];
            let submenujson = _.filter(menuJson, { "group": key })
            let subGrouplist = _.groupBy(submenujson, "subgroup")

            Object.keys(subGrouplist).map((skey) => {
                let sname = "subgroup" + skey;
                if (skey !== key) {
                    let csl = (<Collapse in={this.state[name]} timeout="auto" unmountOnExit key={"collopased" + sname}>
                        <List component="div" disablePadding key={"collopasedlist" + name}>
                            {this.getListItem(skey, sname, { "group": key, "subgroup": skey })}
                            {this.getCollapsedList(subGrouplist[skey], sname)}
                            {/* {(skey==key) && } */}
                            {/* {this.getCollapsedList(subGrouplist[key],sname,true)} */}
                        </List>
                    </Collapse>)
                    subListComp.push(csl)
                }
                else if (skey == key) {
                    subListComp.push(this.getCollapsedList(subGrouplist[skey], name, false))
                }

                // }
            })
            let gl = (<List key={name}>
                {listitem}
                {subListComp}
            </List>
            )
            listComp.push(gl)
        })
        // console.log(listComp);
        return listComp
    }

    getCollapsedList = (subGrouplist, name, onlyListItems = false) => {
        let arrMenuList = [];
        subGrouplist.map((row) => {
            arrMenuList.push(this.getListItem(row["menu"], "", row))
        })
        let collapse = (
            <Collapse in={this.state[name]} timeout="auto" unmountOnExit={true} key={"colloased" + name}>
                <List component="div" disablePadding key={"collopseList" + name}>
                    {arrMenuList}
                </List>
            </Collapse>)
        if (onlyListItems) return arrMenuList;
        return collapse
    }


    getListItem = (name, groupkey, listdata) => {

        let click = groupkey ? this.handleGroupClick : this.handleMenuClick;
        let icons = (this.state[groupkey] ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />)
        let styles = {}
        if (groupkey) styles = { "paddingLeft": "5px" ,backgroundColor:colorcodes[0],color:"white"};
        if (groupkey.includes("subgroup")) styles = { "paddingLeft": "10px",backgroundColor:colorcodes[1],color:"white" };
        if(groupkey=="")styles={backgroundColor:colorcodes[4],color:"white"};

        if(name && groupkey=="" && this.props && this.props.appConfig.state["user"]
         && this.props.appConfig.state["user"]["usercode"].toUpperCase()!=="ADMIN"){
            let userRoles=this.props.appConfig.state["user"]["menurights"]
            let fdata=_.filter(userRoles,{"menu":name});
            if(fdata.length==0) return;

        }
        return (<ListItem button onClick={click} data-listdata={JSON.stringify(listdata)} key={groupkey + name} style={styles}>
            <ListItemIcon>
                <>
                {listdata.icon && <Tooltip title={name} arrow><Icon style={{color:"white",background:"inherit"}}>{listdata.icon}</Icon></Tooltip>}
                {(listdata.icon == "" || listdata.icon == undefined) &&
                    <Tooltip title={name} arrow>
                        <Avatar style={{color:"white",background:"inherit"}}>{name.match(/\b\w/g).join('')}</Avatar>
                    </Tooltip>
                }
                </>
            </ListItemIcon>
            {this.props.drawerOpen && <ListItemText primary={name} />}
            {groupkey !== "" && this.props.drawerOpen && icons}

        </ListItem>)
    }


    handleGroupClick = (e) => {
        let listdata = JSON.parse(e.currentTarget.dataset.listdata)
        if (listdata["group"] && listdata["subgroup"]) {
            let obj = {};
            obj["subgroup" + listdata["subgroup"]] = !this.state["subgroup" + listdata["subgroup"]]
            this.setState(prevState => {
                return { ...prevState, ...Object.assign(prevState, obj) };
            });
        }
        if (listdata["group"] && listdata["subgroup"] == undefined) {
            let obj = {};
            obj["group" + listdata["group"]] = !this.state["group" + listdata["group"]]
            this.setState(prevState => {
                return { ...prevState, ...Object.assign(prevState, obj) };
            });
        }

    }

    handleMenuClick = (e) => {
        let listdata = JSON.parse(e.currentTarget.dataset.listdata)
        // console.log(listdata);
        // this.props.history.push("/city");
        this.props.history.push(listdata.url);
    }

    render() {
        return (this.getMenuList());
    }
}

export default MenuList;