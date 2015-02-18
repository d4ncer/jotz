var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/actionCreator');
var NoteBlock = require('./NoteBlock');

var Editor = React.createClass({
  newBlock: function() {
    var blocks = this.props.note.blocks.concat(['']);
    this.props.updateBlocks(blocks);
  },

  updateBlock: function(index, value) {
    //this.props.note.blocks[index] = value;
    var blocks = _.clone(this.props.note.blocks);
    blocks[index] = value;
    this.props.updateBlocks(blocks);
  },

  saveNote: function() {
    actionCreator.saveNote(this.props.note);
  },

  render: function() {
    var save = this.handleSave;
    var noteBlocks = this.props.note.blocks.map(function (block, index) {
      return (
        <NoteBlock
          value={block}
          blockNum={index}
          updateBlock={this.updateBlock}
        />
      );
    }.bind(this));
    return (
      <div className='ace-editor-container'>
        <h3>{this.props.note.title}</h3>
        <button onClick={this.newBlock}>NEW BLOCK</button>
        {noteBlocks}
        <button onClick={this.saveNote}>SAVE</button>
      </div>
    );
  }
});

module.exports = Editor;