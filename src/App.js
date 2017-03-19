import React, {
  Component
} from 'react';
import './App.css';
import Modal from 'react-modal';

class RecipeBox extends React.Component {
  constructor() {
    super();

  var recipes = [{
    "name": "Lasagna Soup",
    "ingredients": "Chocolate, Crust, Whip Cream",
    "instructions": "Make a delicious mincemeat wafer.",
     "image": "http://www.kevinandamanda.com/recipes/wp-content/uploads/2014/11/Dark-Chocolate-Salted-Caramel-Oreo-Pie-Recipe-14.jpg"
   }, {
    "name": "Cats-erole",
    "ingredients": "rabbit leg, old wash basin, 1/2 cup grow pellets",
    "instructions": "Put it in the dish and experiment.",
    "image": "https://voolas.com/wp-content/uploads/2016/04/cats-12-everydaykiss.jpg"
  }];

    if (typeof localStorage["recipesStorage"] !== "undefined") {
      recipes = JSON.parse(localStorage["recipesStorage"]);
    }

    this.state = {
      recipes: recipes
    }

    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.add = this.add.bind(this);
  }
  remove(index) {
    var recips = this.state.recipes;
    recips.splice(index, 1);
    this.setState({ recipes: recips });
    //local storage
    var recipesStorage = this.state.recipes;
    localStorage.setItem("recipesStorage", JSON.stringify(recipesStorage));


  }
  save(newName, newIng, newInstr, newImg, index) {
    var recips = this.state.recipes;
    recips[index] = {
      "name": newName,
      "ingredients": newIng,
      "instructions": newInstr,
      "image": newImg
    }
    this.setState({ recipes: recips });
    //local storage
    var recipesStorage = this.state.recipes;
    localStorage.setItem("recipesStorage", JSON.stringify(recipesStorage));

  }
  add(newName, newIng, newInstr, newImg) {
    var recips = this.state.recipes;
    var newRecip = {
      "name": newName,
      "ingredients": newIng,
      "instructions": newInstr,
      "image": newImg
    }
    recips.push(newRecip);
    this.setState({ recipes: recips });
    //local storage
    var recipesStorage = this.state.recipes;
    localStorage.setItem("recipesStorage", JSON.stringify(recipesStorage));
  }
  render() {
    return (
      <div className="recipeBox">
        <Header />
        <AddRecip addRecipe={this.add} />
        {this.state.recipes.map((recipe, i) => <ViewRecipe key={i} index={i} recipes={recipe} saveRecipe={this.save} removeRecipe={this.remove} />)}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header">
            <h1 className="title">Recipe Box</h1>
         </div>
    );
  }
}

class ViewRecipe extends React.Component {

  constructor() {
    super();

    this.state = {
      editing: false,
      viewing: false
    };
    this.viewing = this.viewing.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
  }
  edit() {
    this.setState({
      editing: true,
      viewing: false
    });
  }
  showEdit() {
    return (
      <div className="row">
        <h4 className="edith4">Name</h4>
        <textarea ref="newName" defaultValue={this.props.recipes.name}></textarea>
        <h4 className="edith4">Ingredients</h4>
        <textarea ref="newIng" defaultValue={this.props.recipes.ingredients} ></textarea>
        <h4 className="edith4">Instructions</h4>
        <textarea ref="newInstr" defaultValue={this.props.recipes.instructions}></textarea>
        <h4 className="edith4">Image URL</h4>
        <textarea ref="newImg" defaultValue={this.props.recipes.image}></textarea>
        <div className="butbar">
          <button className="butbarbut" onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }
  remove() {
    var index = this.props.index;
    this.props.removeRecipe(index);

    this.setState({
      editing: false,
      viewing: false
    });
  }
  save() {
    var index = this.props.index;
    var newName = this.refs.newName.value;
    var newIng = this.refs.newIng.value;
    var newInstr = this.refs.newInstr.value;
    var newImg = this.refs.newImg.value;
    this.props.saveRecipe(newName, newIng, newInstr, newImg, index);

    this.setState({
      editing: false,
      viewing: true
    });
  }
  viewing() {
    this.setState({
      viewing: !this.state.viewing
    });
  }
  areViewing() {
    return (
      <div>
        <button onClick={this.viewing} className="recipBut">{this.props.recipes.name}</button>
          <div className="row">
            <div className="col-sm-6">
              <h4 className="viewName">{this.props.recipes.name}</h4>
              <h4>Ingredients</h4>
              <p className="viewText">{this.props.recipes.ingredients}</p>
              <h4>Instructions</h4>
              <p className="viewText">{this.props.recipes.instructions}</p>
              <div className="butbar">
                <button className="butbarbut" onClick={this.edit}>Edit</button>
                <button className="butbarbut" onClick={this.remove}>Delete</button>
              </div>
            </div>
            <div className="col-sm-6">
              <img src={this.props.recipes.image} alt="" className="recipImage" />
            </div>
          </div>
      </div>
    );
  }
  notViewing() {
    return (
      <div>
        <button onClick={this.viewing} className="recipBut">{this.props.recipes.name}</button>
      </div>
    );
  }
  render() {
    if (this.state.viewing) {
      return this.areViewing();
    } else if (!this.state.viewing && !this.state.editing) {
      return this.notViewing();
    } else if (this.state.editing) {
      return this.showEdit();
    }
  }
}

//modal for adding recipe
class AddRecip extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    var newName = this.refs.newName.value;
    var newIng = this.refs.newIng.value;
    var newInstr = this.refs.newInstr.value;
    var newImg = this.refs.newImg.value;
    this.props.addRecipe(newName, newIng, newInstr, newImg);
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal} className="addBut">Add Recipe</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add a Recipe to the Box"
        >
          <button className="close" onClick={this.closeModal}>X</button>
          <h4 className="modh4">Name</h4>
          <textarea className="modtext" ref="newName" placeholder="What do you call this dish?"></textarea>
          <h4 className="modh4">Ingredients</h4>
          <textarea className="modtext" ref="newIng" placeholder="What's it made from?"></textarea>
          <h4 className="modh4">Instructions</h4>
          <textarea className="modtext" ref="newInstr" placeholder="How do you make it?"></textarea>
          <h4 className="modh4">Image URL</h4>
          <textarea className="modtext" ref="newImg" placeholder="Paste this item's image URL"></textarea>
          <div className="butbar">
            <button className="butbarmod" onClick={this.save}>Save</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 76, 76, 0.75)'
  },
  content: {
    width: '350px',
    background: '#400080',
    color: '#FFDC4C',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default RecipeBox;