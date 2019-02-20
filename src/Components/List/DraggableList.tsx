import * as React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// css
import '../.././App.css'

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
    this.state = {
      items: [],
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.props.reorderDraggableList(
      this.props.poll_items,
      result.source.index,
      result.destination.index
    );

    console.log(items)

    this.props.handleReorder(items)
  }

  public render()
  {
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
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
      </DragDropContext>
  )}
}
