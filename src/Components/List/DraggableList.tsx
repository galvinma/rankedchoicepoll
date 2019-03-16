import * as React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// css
import '../.././App.css'
import './DraggableList.css'

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export default class ListItem extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props)
    this.state = {}
    this.onDragEnd = this.onDragEnd.bind(this)
    this.move = this.move.bind(this)
    this.getList = this.getList.bind(this)
  }

  public getList(id: string)
  {
    return this.props[id]
  }

  public move(source: any, destination: any, sourceID: any, destID: any, sourceIndex: any, destinationIndex: any)
  {

      console.log(sourceIndex)
      console.log(destinationIndex)
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
        <div className="listContainer">
          <Droppable droppableId="poll_items">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.poll_items.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
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
          <Droppable droppableId="selected">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.selected.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
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
      </DragDropContext>
  )}
}
