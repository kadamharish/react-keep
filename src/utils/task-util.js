import React from 'react';
import * as Constant from "../constants"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArchive, faListUl, faTimes, faUndo, faPaperclip } from '@fortawesome/free-solid-svg-icons'


// Returns task list card.
export const TaskListCard = ({ oldTaskList, getDataForModal, from }) => {
    return oldTaskList.map(function (value, key) {
        let val;
        switch (from) {
            case Constant.FROM_DELETE:
                val = value.isDeleted;
                if (!val) {
                    value.tasks.forEach(task => {
                        if (task.isDeleted) {
                            val = true;
                        }
                    });
                }
                break;
            case Constant.FROM_ARCHIVE:
                val = value.isArchived;
                if (!val) {
                    value.tasks.forEach(task => {
                        if (task.isArchived) {
                            val = true;
                        }
                    });
                }
                break;
            case Constant.FROM_HOME:
                val = !value.isDeleted && !value.isArchived;
                break;
            default:
                val = false;
        }
        return (
            val ?
                <div key={key} className="col-sm-4 col-lg-2 col-md-3 col-xs-4">
                    <div onClick={() => { getDataForModal(value) }} className="card">
                        <div className="card-body cursorPointer content-justify-left "
                            style={{ height: 'auto', padding: '0.25rem', fontFamily: 'Arial' }} data-toggle="modal" data-target="#exampleModalCenter">
                            <h5> <strong> {value.title}</strong></h5>
                            <TaskImageList tasks={value.tasks} from={from}></TaskImageList>

                        </div>
                    </div>
                </div>
                : ''
        );
    })
}

// Returns Task with image associated.
const TaskImageList = ({ tasks, from }) => {
    // Map through the tasks
    const task = tasks.map(function (item, key) {
        let val;
        switch (from) {
            case Constant.FROM_DELETE:
                val = item.isDeleted;
                break;
            case Constant.FROM_ARCHIVE:
                val = item.isArchived && !item.isDeleted
                break;
            case Constant.FROM_HOME:
                val = !item.isDeleted && !item.isArchived;
                break;
            default:
                val = false;
        }
        return (
            val ? <div key={key} style={{ marginBottom: '2px' }} className="media justify-content-between">
                <div className="media-body ">
                    {item.isCompleted ? <del>{item.text}</del> : item.text}
                </div>
                <div className="media-right">
                    {item.img ? <Image url={item.img} ></Image> : ''}
                </div>
            </div> : ''
        );
    })
    return (
        <div className="form-group" style={{ fontSize: '12px', listStyleType: 'none' }}>
            {task}
        </div>
    );
}

// Returns modal with tasklist details on home and archived page.
export const TaskModal = ({ from, state, onTitleChange, addTask, onCheckChange, onDeleteClick,
    onArchiveClick, addCheckbox, saveTaskList, onTaskDelete, onTaskArchive, onFileUpload }) => {
    let newTaskList = state.newTaskList;
    let task;

    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content modal-contentTopMargin">
                    <div className="modal-body">

                        <form style={{ padding: '0' }}>
                            <div className="form-group" style={{ marginBottom: '0' }}>
                                <input type="text" className="form-control" id="input1" value={state.newTaskList.title}
                                    onChange={(e) => onTitleChange(newTaskList, e.target.value)}
                                    autoComplete="off" placeholder="Enter title" />
                            </div>
                            <div className="form-group" style={{ marginBottom: '0' }} >
                                <div className="input-group">
                                    <input type="text" autoComplete="off" className="form-control form-control-sm"
                                        ref={node => {
                                            task = node;
                                        }}
                                        id="input2" placeholder="Enter task" />

                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-sm btn-light" onClick={() => {
                                            if (task.value !== '') {
                                                addTask(newTaskList, task.value);
                                                task.value = '';
                                            }
                                        }}>Add</button>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ marginBottom: '0.25rem', marginTop: '0.25rem' }}></hr>

                            <CustomCheckbox from={from} newTaskList={newTaskList} onCheckChange={onCheckChange} onTaskDelete={onTaskDelete} onTaskArchive={onTaskArchive} onFileUpload={onFileUpload}  ></CustomCheckbox>

                        </form>

                    </div>
                    <div className="modal-footer pull-left" style={{ padding: '0' }}>
                        {!state.isNew ?
                            <div>
                                <FontAwesomeIcon onClick={() => onDeleteClick(newTaskList)} icon={faTrash} data-dismiss="modal" className="cursorPointer mr-3" title="Delete note" ></FontAwesomeIcon>
                                {
                                    from !== Constant.FROM_ARCHIVE ?
                                        <FontAwesomeIcon onClick={() => onArchiveClick(newTaskList)} icon={faArchive} data-dismiss="modal" className="cursorPointer mr-3" title="Archive" ></FontAwesomeIcon>
                                        : <FontAwesomeIcon onClick={() => onArchiveClick(newTaskList)} icon={faUndo} data-dismiss="modal" className="cursorPointer mr-3" title="Unarchive" ></FontAwesomeIcon>

                                }
                            </div> : ''
                        }
                        <FontAwesomeIcon onClick={() => addCheckbox(newTaskList)} icon={faListUl} className="cursorPointer mr-3" title="Check list" ></FontAwesomeIcon>

                        <ModalDismissButton></ModalDismissButton>

                        <button type="button" onClick={() => {
                            saveTaskList(newTaskList)
                        }} data-dismiss="modal" className="btn btn-light btn-sm" >Save</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

// Returns tasks with or without checkbox depending on condition.
export const CustomCheckbox = ({ from, newTaskList, onCheckChange, onTaskDelete, onTaskArchive, onFileUpload }) => {
    // Map through the todos
    const task = newTaskList.tasks.map(function (item, key) {
        let val;
        // let fileType;
        switch (from) {
            case Constant.FROM_ARCHIVE:
                val = (newTaskList.isArchived || !item.isDeleted) && item.isArchived;
                break;
            case Constant.FROM_HOME:
                val = !item.isDeleted && !item.isArchived;
                break;
            default:
                val = false;
        }
        return (
            val ?
                newTaskList.isCheckbox ?
                    <div key={key} className="form-check media">
                        <div className="media-left">
                            <input key={key} type="checkbox" className="form-check-input" checked={item.isCompleted} onChange={() => { onCheckChange(newTaskList, item) }} id={`defaultCheck` + key} />
                            {item.img ? <Image url={item.img} ></Image> : ''}
                            <label htmlFor={`defaultCheck` + key}>
                                {item.isCompleted ? <del>{item.text}</del> : item.text}
                            </label>
                        </div>
                        <div className="media-body">
                            <ActionButtons itemID={item.id} from={from} onTaskDelete={onTaskDelete} onTaskArchive={onTaskArchive} onFileUpload={onFileUpload} ></ActionButtons>
                        </div>
                    </div>
                    : <li key={key} className="media" style={{ marginBottom: '5px' }}>
                        <div className="media-left">  {item.img ? <Image url={item.img} ></Image> : ''}
                            {item.text}</div>
                        <div className="media-body">
                            <ActionButtons itemID={item.id} from={from} onTaskDelete={onTaskDelete} onTaskArchive={onTaskArchive} onFileUpload={onFileUpload} ></ActionButtons>
                        </div>
                    </li>
                : ''
        )
    })
    return (
        <div className="form-group" style={{ fontSize: '14px', listStyleType: 'none' }}>
            {task}
        </div>
    );
}

// Returns Action buttons like delete and Archive.
export const ActionButtons = ({ itemID, from, onTaskDelete, onTaskArchive, onFileUpload }) => {
    let fileType;

    return (
        <div>
            <FontAwesomeIcon onClick={() => onTaskDelete(itemID)} icon={faTimes} pull="right" className="cursorPointer mr-3" title="Delete task" ></FontAwesomeIcon>
            {
                from === Constant.FROM_ARCHIVE ?
                    <FontAwesomeIcon icon={faUndo} pull="right" onClick={() => onTaskArchive(itemID)} className="cursorPointer mr-3" title="Undo task" ></FontAwesomeIcon>
                    : <FontAwesomeIcon icon={faArchive} pull="right" onClick={() => onTaskArchive(itemID)} className="cursorPointer mr-3" title="Archive task" ></FontAwesomeIcon>

            }
            <input type='file' ref={(e) => { fileType = e; }} value="" onChange={(e) => onFileUpload(e, itemID)} style={{ display: 'none' }} ></input>
            <FontAwesomeIcon onClick={() => fileType.click()} icon={faPaperclip} pull="right" className="cursorPointer mr-3" title="Delete task" ></FontAwesomeIcon>
        </div>
    )
}

// Returns Image tag.
export const Image = ({ url }) => {
    return <img height="25" width="25" className="media-object" src={url} alt="..." />
}

// Returns Modal Dismiss button
export function ModalDismissButton() {
    return <button type="button" className="btn btn-light btn-sm" data-dismiss="modal">Close</button>
}