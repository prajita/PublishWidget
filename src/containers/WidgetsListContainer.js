import React, { Component } from "react";
import WidgetCard from "./WidgetCard";


class WidgetsListContainer extends Component{

    render() {
        let showData = [];
        const {onClickEditWidget,onClickDeleteWidget, list, isApprover } = this.props;
        if (list && list.length > 0) {
          list.map((each, index) => {
            showData.push(
                <WidgetCard 
                    isApprover={isApprover}
                    key={index} 
                    indexKey={index} 
                    data={each} 
                    onClickEditWidget={onClickEditWidget}
                    onClickDeleteWidget={onClickDeleteWidget}
                  />
              )
          })
        }
    
        return (
          <div className="widget-container">
              {showData}
          </div>
    
        )
      }
    }    
export default WidgetsListContainer;