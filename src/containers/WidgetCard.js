import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproverActions } from './ApproverActions';
import { ButtonComponent } from '../components/ButtonComponent';
import { ColouredButtonComponent } from '../components/ColouredButtonComponent';

const CardComponent = props => {
    const {onClickEditWidget,onClickDeleteWidget, approveWidget, publishWidget,rejectWidget, data, isApprover} =props;
    const {title, shortDesc, category, publishedOn, status, _id} = data;
    const showMore = shortDesc.length> 200;

    const showText=()=>{
        return (showMore ? 
            <>
                <span>{shortDesc.substring(0, 200).concat(" ")}</span>
                <Tooltip title={shortDesc}><span className="text-show-more">show more</span></Tooltip>
            </>:
            <span>{shortDesc}</span>);
    }
    return (
         
            <div className="card">
                <div className="card-header">
                    <div className="card-header-left-section">
                        <ColouredButtonComponent disabled className="card-header-status-btn" size="small" status={status}/>
                        <div className="card-title">{title}</div>
                    </div>  
                    {publishedOn && <div className="card-header-date">Published on :{publishedOn}</div>}
                </div>
                <div className="card-body">
                    <p className="card-text">{showText()}</p>
                    <p className="card-text">Category: {category}</p>
                </div>
                <div className="card-footer">
                        <span className="card-footer-link">
                            <a className="card-footer-link-anchor" href="javascript:void(0)" >Full Report</a>
                        </span>
                        
                        {(!isApprover &&  (status ==="rejected" || status==="created"))?
                         <div className="card-footer-buttons">
                            <IconButton color="primary" aria-label="edit" onClick={ ()=>onClickEditWidget(_id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="delete" onClick={ ()=>onClickDeleteWidget(_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>:
                        isApprover ? <ApproverActions 
                            status={status} 
                            approveWidget={()=>approveWidget(_id)} 
                            rejectWidget={()=>rejectWidget(_id)} 
                            publishWidget={()=>publishWidget(_id)}/>
                        : null 
                        }
                    </div>
            </div>
  );  
}
const WidgetCard = props => <CardComponent {...props}/>
export default WidgetCard;