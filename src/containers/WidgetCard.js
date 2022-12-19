import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproverActions } from './ApproverActions';

const CardComponent = props => {
    const {onClickEditWidget,onClickDeleteWidget, data, indexKey, isApprover} =props;
    const {title, shortDesc, category, } = data;
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
                <div className="card-body">
                    <div className="card-title">{title}</div>
                    <p className="card-text">{showText()}</p>
                    <p className="card-text">Category: {category}</p>
                </div>
                <div className="card-footer">
                        <span className="card-footer-link">
                            <a className="card-footer-link-anchor" href="#" >Learn More</a>
                        </span>
                        
                        {!isApprover ?
                         <div className="card-footer-buttons">
                            <IconButton color="primary" aria-label="edit" onClick={ ()=>onClickEditWidget(indexKey)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="delete" onClick={ ()=>onClickDeleteWidget(indexKey)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>:
                        <ApproverActions/>}
                    </div>
            </div>
  );  
}
const WidgetCard = props => <CardComponent {...props}/>
export default WidgetCard;