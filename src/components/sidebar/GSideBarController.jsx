import React from 'react'
import '../../style/sidebar/GSideBar.css';
import Icons from "../common/icons";
import {useDispatch, useSelector} from "react-redux";
import GSideBar from "./GSideBar";
import GSideBarInfoController from "./GSideBarInfoController";
import {SET_SIDEBAR_TYPE} from "../../store/reducers/globalReducer";
import GSideBarNewEntity from "./GSideBarNewEntity";
import GSideBarRoutes from "./GSideBarRoutes";

const GSideBarController = (props) => {
    const [hidden, setHidden] = React.useState(false);
    const sidebarType = useSelector(state => state.global.sideBarType);
    const dispatch = useDispatch();
    const controlSideBar = React.useCallback( (type) => {
        switch(type) {
            case 'info': {
                return <GSideBarInfoController />
            }
            case 'new-entity': {
                return <GSideBarNewEntity />
            }
            case 'routes': {
                return <GSideBarRoutes />
            }
            default:
                return <GSideBar />
        }
    }, [])

    return (
        <div className={`g-side-bar`}>
            <div className={`g-side-bar__inner ${hidden ? 'g-side-bar__inner--hidden' : ''}`}>
                {controlSideBar(sidebarType)}
            </div>
            <div  className={`g-side-bar__hide-btn ${hidden ? 'g-side-bar__hide-btn--active' : ''}`}
                  onClick={() => {
                      setHidden(!hidden);
                  }}>
                <Icons name='arrow' color='#000' size='32' className='' />
            </div>
            {
                sidebarType &&
                <div className={`${hidden ? '' : 'g-side-bar__hide-btn g-side-bar__hide-btn--down'}`}
                     onClick={() => {
                         dispatch({type: SET_SIDEBAR_TYPE, payload: ''})
                     }}>
                    <Icons name='close' color='#000' size='32' className='' />
                </div>
            }
        </div>
    )
}

export default GSideBarController;
