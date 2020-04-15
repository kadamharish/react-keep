
import React from "react";
import * as Constant from "../../constants"
import { TaskListCard, ModalDismissButton } from '../../utils/task-util';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons'

export default class Deleted extends React.Component {
    constructor(props) {
        super(props);
        this.updateToDB = this.updateToDB.bind(this);
        this.singleTaskRestore = this.singleTaskRestore.bind(this);
        this.state = {
            newTaskList: {
                tasks: [],
                isDeleted: false
            },
            oldTaskList: [],
            username: ''
        }
    }
    componentDidMount() {
        const userDetails = JSON.parse(sessionStorage.getItem(Constant.USER_DETAILS));
        const taskList = JSON.parse(localStorage.getItem(userDetails.username));
        console.log(taskList);
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

    restoreAll() {
        let data = this.state.newTaskList;
        data.isDeleted = false;
        data.tasks.forEach(value => {
            value.isDeleted = false;
        })

        this.setState({
            newTaskList: data
        })
        this.updateToDB(this.state.oldTaskList);
    }
    updateToDB(taskList) {
        localStorage.setItem(this.state.username, JSON.stringify(taskList));
    }

    singleTaskRestore(taskId) {
        let data = this.state.newTaskList;
        data.tasks.forEach(value => {
            if (value.id === taskId) {
                value.isDeleted = false;
            }
        })

        data.isDeleted = false;

        this.setState({
            newTaskList: data
        })
        this.updateToDB(this.state.oldTaskList);
    }

    render() {
        let taskList = this.state.newTaskList;
        return (
            <div>
                <section className="sectionPadding">
                    <div className="card cardContent">
                        <div className="card-body">
                            <div className="row">
                                <TaskListCard oldTaskList={this.state.oldTaskList} from={Constant.FROM_DELETE} onDataUpdate={this.onDataUpdate.bind(this)}></TaskListCard>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-contentTopMargin">
                            <div className="modal-body">
                                <h5>{taskList.title}</h5>
                                <hr style={{ marginBottom: '0.25rem', marginTop: '0.25rem' }}></hr>
                                <TaskList taskList={taskList} singleTaskRestore={this.singleTaskRestore}></TaskList>
                            </div>
                            <div className="modal-footer pull-left" style={{ padding: '0' }}>
                                <FontAwesomeIcon onClick={() => this.restoreAll()} data-dismiss="modal" icon={faTrashRestore} className="cursorPointer mr-3" title="Restore all" ></FontAwesomeIcon>
                                <ModalDismissButton></ModalDismissButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export const TaskList = ({ taskList, singleTaskRestore }) => {
    // Map through the todos
    return taskList.tasks.map(function (item, key) {
        return (
            taskList.isDeleted ?
                <li key={key}> {item.text}
                    <FontAwesomeIcon pull="right" onClick={() => { singleTaskRestore(item.id) }} data-dismiss="modal" icon={faTrashRestore} className="cursorPointer mr-3" title="Restore " ></FontAwesomeIcon>
                </li>
                : item.isDeleted ? <li key={key}> {item.text}
                    <FontAwesomeIcon pull="right" onClick={() => { singleTaskRestore(item.id) }} data-dismiss="modal" icon={faTrashRestore} className="cursorPointer mr-3" title="Restore" ></FontAwesomeIcon>
                </li> : ''
        )
    })
}

