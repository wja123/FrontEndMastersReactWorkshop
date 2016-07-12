////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var styles = require('./styles');
var data = require('./data');

var Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    setActiveTab : React.PropTypes.func,
    activeTabIndex: React.PropTypes.number
  },
  tabSelected(index){
    this.props.setActiveTab(index);
  },
  renderTabs () {
    return this.props.data.map((tab, index) => {
      var style = this.props.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = this.tabSelected.bind(this, index);
      return (
        <div key={tab.name} style={style} onClick={clickHandler}>
          {tab.name}
        </div>
      );
    });
  },
  renderPanel () {
    var tab = this.props.data[this.props.activeTabIndex];
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  },
  render () {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }
});


var App = React.createClass({
  getInitialState() {
      return {
          activeTabIndex : 0  
      };
  },
  setActiveTab(index){
    this.setState({activeTabIndex : index})
  },
  render () {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs data={this.props.tabs} setActiveTab={this.setActiveTab} activeTabIndex={this.state.activeTabIndex}/>
      </div>
    );
  }
});

React.render(<App tabs={data}/>, document.body);

