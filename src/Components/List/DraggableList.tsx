import * as React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// css
import '../.././App.css'
import './DraggableList.css'

const grid = 8;

export default class ListItem extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.move = this.move.bind(this)
    this.getList = this.getList.bind(this)
    this.getListStyle = this.getListStyle.bind(this)
    this.getItemStyle = this.getItemStyle.bind(this)
  }

  public getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? '#F5F5F5' : '#FFFFFF',
    border: '1px solid #000000',
    borderRadius: '2px',
    width: '250px',
    minHeight: `${this.props.number_of_items*25}px`,
    marginLeft: '20px',
    marginRight: '20px',
  });

  public getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    border: '1px solid #EEEEEE',
    background: isDragging ? '#EEEEEE' : '#FFFFFF',
    height: '25px',
    ...draggableStyle,
  });


  public getList(id: string)
  {
    return this.props[id]
  }

  public move(source: any, destination: any, sourceID: any, destID: any, sourceIndex: any, destinationIndex: any)
  {
      const sourceClone = source.slice(0)
      const destClone = destination.slice(0)
      const [removed] = sourceClone.splice(sourceIndex, 1)
      destClone.splice(destinationIndex, 0, removed)

      const result: any = {}
      result[sourceID] = sourceClone
      result[destID] = destClone
      return result
  }

  public onDragEnd(result: any)
  {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId)
    {
      const list = this.getList(result.source.droppableId)
      const items = this.props.reorderDraggableList(
        list,
        result.source.index,
        result.destination.index
      );
      this.props.handleReorder(items, result.source.droppableId)
    }
    else
    {
      const lists: any = this.move(
        this.getList(result.source.droppableId),
        this.getList(result.destination.droppableId),
        result.source.droppableId,
        result.destination.droppableId,
        result.source.index,
        result.destination.index,
      )

      // TODO: Add a message informing user the max selection count has been reached
      if (lists.selected.length > this.props.options)
      {
        return
      }

      this.props.handleReorder(lists.poll_items, 'poll_items')
      this.props.handleReorder(lists.selected, 'selected')
    }
  }

  public render()
  {

    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="listGroupContainer">
          <div className="listContainer">
            <div className="listLabel headerTwo">Poll Entries</div>
            <Droppable droppableId="poll_items">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={this.getListStyle(snapshot.isDraggingOver)}
                  className="droppableList"
                >
                  {this.props.poll_items.map((item: any, index: any) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="draggableItem"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={this.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="listContainer">
            <div className="listLabel headerTwo">My Votes</div>
            <Droppable droppableId="selected">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={this.getListStyle(snapshot.isDraggingOver)}
                  className="droppableList"
                >
                  {this.props.selected.map((item: any, index: any) => (
                    <Draggable key={item.id} draggableId={item.id} index={index} >
                      {(provided, snapshot) => (
                        <div
                          className="draggableItem"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={this.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
  )}
}
