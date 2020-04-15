
import React from "react";
import * as Constant from "../../constants"
import { TaskListCard, TaskModal } from '../../utils/task-util';

export default class Archived extends React.Component {
    constructor(props) {
        super(props);
        this.saveTaskList = this.saveTaskList.bind(this);
        this.addTask = this.addTask.bind(this);
        this.addCheckbox = this.addCheckbox.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
        this.onTaskDelete = this.onTaskDelete.bind(this)
        this.onTaskArchive = this.onTaskArchive.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);

        this.state = {
            username: '',
            newTaskList: {
                id: '',
                title: '',
                isDeleted: false,
                isArchived: false,
                isCheckbox: false,
                tasks: []
            },
            oldTaskList: [],
        }
    }
    componentDidMount() {
        const userDetails = JSON.parse(sessionStorage.getItem(Constant.USER_DETAILS));
        const taskList = JSON.parse(localStorage.getItem(userDetails.username));

        if (taskList && taskList.length > 0) {
            this.setState({
                oldTaskList: taskList
            })
        }
        this.setState({
            username: userDetails.username
        })
    }

    onDataUpdate(taskList) {
        this.setState({
            newTaskList: taskList
        })
    }

    saveTaskList(newTaskList) {
        let oldTaskList = this.state.oldTaskList;
        if (newTaskList.id) {
            oldTaskList.forEach(value => {
                if (value.id === newTaskList.id) {
                    value.isCompleted = newTaskList.isCompleted;
                    value.isDeleted = newTaskList.isDeleted;
                    value.tasks = newTaskList.tasks;
                    value.isArchived = newTaskList.isArchived;
                }
            })
        } else {
            newTaskList.id = new Date().valueOf();
            oldTaskList.push(newTaskList);
        }

        this.updateToDB(oldTaskList);
        this.setState({
            newTaskList: {
                title: '',
                isDeleted: false,
                isArchived: false,
                isCheckbox: false,
                tasks: []
            },
            oldTaskList: oldTaskList
        });
    }
    addTask(newTaskList, taskData) {
        let task = {
            id: 'task' + new Date().valueOf(),
            text: taskData,
            isDeleted: false,
            isArchived: true,
            isCompleted: false,
        }
        newTaskList.tasks.push(task);
        this.setState({
            newTaskList: newTaskList
        })
    }

    addCheckbox(newTaskList) {
        newTaskList.isCheckbox = !newTaskList.isCheckbox;
        this.setState({
            newTaskList: newTaskList
        })
    }

    onCheckChange(newTaskList, item) {
        newTaskList.tasks.forEach(value => {
            if (item.id === value.id) {
                value.isCompleted = !value.isCompleted;
            }
        });
        this.setState({
            newTaskList: newTaskList
        })
    }

    onTitleChange(newTaskList, title) {
        newTaskList.title = title;
        this.setState({
            newTaskList: newTaskList
        })
    }

    onDeleteClick(item) {
        let oldTaskList = this.state.oldTaskList;
        oldTaskList.forEach(value => {
            if (value.id === item.id) {
                value.isDeleted = !value.isDeleted;
                value.tasks.forEach(val => {
                    val.isDeleted = true;
                })
            }
        });
        this.setState({
            oldTaskList: oldTaskList
        })
        this.updateToDB(oldTaskList);
    }
    onArchiveClick(item) {
        let oldTaskList = this.state.oldTaskList;
        oldTaskList.forEach(value => {
            if (value.id === item.id) {
                value.isArchived = false;
                value.tasks.forEach(val => {
                    val.isArchived = false;
                })
            }
        });
        this.setState({
            oldTaskList: oldTaskList
        })
        // console.log(item);
        this.updateToDB(oldTaskList);
    }

    onTaskDelete(taskId) {
        let data = this.state.newTaskList;
        data.tasks.forEach(value => {
            if (value.id === taskId) {
                value.isDeleted = true;
            }
        })

        this.setState({
            newTaskList: data
        })
    }
    updateToDB(taskList) {
        localStorage.setItem(this.state.username, JSON.stringify(taskList));
    }

    onTaskArchive(taskId) {
        let data = this.state.newTaskList;
        let count = 0;
        data.tasks.forEach(value => {
            if (value.id === taskId) {
                value.isArchived = !value.isArchived;
            }
            if (!value.isArchived) {
                count++;
            }
        })

        if (count === data.tasks.length) {
            data.isArchived = false;
        }
        this.setState({
            newTaskList: data
        })
    }
    onFileUpload(event, itemId) {
        let file = event.target.files[0];

        let newTaskList = this.state.newTaskList;;

        this.getBase64(file, (result) => {
            newTaskList.tasks.forEach(val => {
                if (val.id === itemId) {
                    val.img = result
                }
            })
            this.setState({
                newTaskList: newTaskList
            })
        });

    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    render() {
        let oldTaskList = this.state.oldTaskList;

        return (
            <section className="sectionPadding">
                <div className="card cardContent">
                    <div className="card-body">
                        <div className="row">

                            <TaskListCard oldTaskList={oldTaskList} from={Constant.FROM_ARCHIVE} onDataUpdate={this.onDataUpdate.bind(this)}></TaskListCard>

                        </div>
                    </div>
                </div>
                <TaskModal from={Constant.FROM_ARCHIVE} state={this.state} onTitleChange={this.onTitleChange} addTask={this.addTask}
                    onCheckChange={this.onCheckChange.bind(this)} onDeleteClick={this.onDeleteClick} onArchiveClick={this.onArchiveClick}
                    addCheckbox={this.addCheckbox} saveTaskList={this.saveTaskList} onTaskDelete={this.onTaskDelete} onTaskArchive={this.onTaskArchive} onFileUpload={this.onFileUpload} >
                </TaskModal>
            </section>
        );
    }
}
