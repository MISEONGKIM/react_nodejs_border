import React, { Component } from "react";

export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      idx: 0,
      writer: "",
      title: "",
      content: "",
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     boardData: this.props.boardData
  //   });
  // }

  handleChange(e) {
    let nextState = {}; //비어있는 객체 만들어서 이렇게 하면 여러개의 input태그 처리가능
    nextState[e.target.name] = e.target.value; //target.name 은 input name에 설정된 name
    this.setState(nextState);
  }

  handleEdit() {
    this.props.onEdit(this.state.idx,
      this.state.title,
      this.state.content);
  }
  handleToggle(e) {
    console.log(this.state.isEdit);
    if (!this.state.isEdit) {
      this.setState({
        idx: e.target.value,
        writer: this.props.boardData[e.target.value - 1].writer,
        title: this.props.boardData[e.target.value - 1].title,
        content: this.props.boardData[e.target.value - 1].content,
        date : this.props.boardData[e.target.value - 1].date
      });
    } else {
     this.handleEdit();
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  render() {
    const boards = boardData => {
      return boardData.length > 0
        ? boardData.map((data, i) => {
            return (
              <div>
                <table style={{ border: "1px solid" }}>
                  <tbody>
                    <tr>
                      <th style={{ border: "1px solid" }}>{data.idx}</th>
                      <th style={{ border: "1px solid" }}>
                        {data.title}
                      </th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid" }}>
                        작성자 : {data.writer}
                      </td>
                      <td style={{ border: "1px solid" }}>
                        작성일 : {data.date}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ border: "1px solid" }}>
                        {data.content}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ border: "1px solid" }}>
                        <form>
                          <button name='idx' value={data.idx} onClick={this.handleToggle}>수정</button>
                          <button  name='idx' value={data.idx} onClick={this.props.onRemove}>삭제</button>
                        </form>
                      </td>
                    </tr>
                    <tr>댓글다는곳</tr>
                  </tbody>
                </table>
                <p />
              </div>
            );
          })
        : "게시글이 없습니다";
    };

    const edit =  (
        <table>
          <tr>
            <th style={{ border: "1px solid" }}> {this.state.idx} </th>
            <th>
              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </th>
          </tr>
          <tr>
            <td>{this.state.writer}</td>
            <td>{this.state.date}</td>
          </tr>
          <tr>
            <td colspan="2">
              <textarea
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <form>
                <button  name='idx' value={this.state.idx} onClick={this.handleToggle}>OK</button>
                <button onClick = {() => {
                    this.setState({
                      isEdit: !this.state.isEdit
                    });
                }}>취소</button>
              </form>
            </td>
          </tr>
        </table>
      );
    return <div>{this.state.isEdit ? edit : boards(this.props.boardData)}</div>;
  }
}
