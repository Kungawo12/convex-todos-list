"use client";


// 
import { useState } from "react";
import {NewToDoForm} from "./_components/new-todo-form";


type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [toDoList, setToDoList] = useState<ToDoItem[]>([
    {title: "Example", description:"This is an example", completed: false}
  ]);
  

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-Do List</h1>
      <ul className="space-y-2">
      {toDoList.map(({ title, description, completed }, index) => (
        <ToDoItem 
          key={index}
          title={title} 
          description={description} 
          completed={completed}  
          onCompleteChanged={(newValue) =>{
            setToDoList(prev =>{
              const newToDoList = [...prev];
            newToDoList[index].completed = newValue;
            return newToDoList; 
            });
          }}
          onRemove={() => {
            setToDoList(prev => {
            const newToDoList = [...prev].filter((_,i) => i !== index);
            return newToDoList;
          });
}}
        />
      ))}
          
    </ul>
      <NewToDoForm onCreate={(title, description) => {
          setToDoList(prev => {
          const newToDoList = [...prev];
          newToDoList.push({title, description, completed: false});
          return newToDoList;
      });
    }} />
    </div>
  );
}

function ToDoItem({title, description,completed, onCompleteChanged, onRemove}: {
  title:string; 
  description: string; 
  complete: boolean; 
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}){
    return (
      <li className="w-full flex item center gap-2 border rounded p-2">
          <input 
          type="checkbox" 
          checked={completed} 
          onChange={e => onCompleteChanged(e.target.checked)}
        />
        <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-grey-600">{description}</p>
        </div>
        <div className="ml-auto">
          <button type="button" className="text-red-500" onClick={onRemove}>Remove</button>
        </div>
        </li>
    )
  }