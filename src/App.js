import React, {
  Component
} from 'react';
import './App.css';
import Modal from 'react-modal';

//main component that holds all others
class RecipeBox extends React.Component {
  constructor() {
    super();

  var recipes = [{
    "name": "Lasagna Soup",
    "ingredients": "2 tsp olive oil, 1-1/2 lbs Italian sausage, 3 c chopped onions, 4 minced garlic cloves, 2 tsp dried oregano, 1/2 tsp crushed red pepper flakes, 2 T tomato paste, 1 28-oz can fire roasted diced tomatoes, 2 bay leaves, 6 c chicken stock, 8 oz mafalda or fusilli pasta, 1/2 c finely chopped fresh basil leaves, salt and freshly ground black pepper to taste; FOR THE 'CHEESY YUM' 8 oz ricotta, 1/2 c grated Parmesan cheese, 1/4 tsp salt, pinch of freshly ground pepper, additional CHEESY, 2 c. shredded mozzarella cheese",
    "instructions": "Heat olive oil in a large pot over medium heat. Add sausage, breaking up into bite sized pieces, and brown for about 5 minutes. Add onions and cook until softened, about 6 minutes. Add garlic, oregano, and red pepper flakes. Cook for 1 minute. Add tomato paste and stir well to incorporate. Cook for 3 to 4 minutes, or until the tomato paste turns a rusty brown color. Add diced tomatoes, bay leaves, and chicken stock. Stir to combine. Bring to a boil and then reduce heat and simmer for 30 minutes. Add uncooked pasta and cook until al dente. Do not over cook or let soup simmer for a long period of time at this point, as the pasta will get mushy and absorb all the soup broth. You may even want to consider cooking the noodles separately, and then adding some to individual bowls before ladling the soup over them. This would be an especially smart move if you are anticipating any leftovers. Right before serving, stir in the basil and season to taste with salt and freshly ground black pepper. While the pasta is cooking, prepare the cheesy yum. In a small bowl, combine the ricotta, Parmesan, salt, and pepper. To serve, place a dollop of the cheesy yum in each soup bowl, sprinkle some of the mozzarella on top and ladle the hot soup over the cheese.",
     "image": "http://www.afarmgirlsdabbles.com/wp-content/uploads/2011/03/IMG_7602_square-1200-optimized-for-screen.jpg"
   }, {
    "name": "Sugar Cream Pie",
    "ingredients": "3⁄4 cup white sugar, 1⁄8 teaspoon salt, 2 cups half-and-half cream, 1⁄2 cup whipping cream, 1⁄4 cup brown sugar, 1⁄4 cup cornstarch, 1⁄2 cup margarine or 1⁄2 cup real butter, 1 teaspoon vanilla",
    "instructions": "In sauce pan combine, white sugar, salt, half-and-half and whipping cream. Bring to a boil. In another sauce pan, combine Br.sugar & cornstarch. Gradually whisk in hot mixture into br.sugar mixture. Add margarine/or butter (to me this makes it even better.). Cook over med. heat, whisk constantly, 5 min or until thick. Simmer 1 minute and stir in van. Pour into uncooked pie shell and sprinkle w/cinnamon and nutmeg. Bake at 375°F for 25 minutes.",
    "image": "http://cf.thedomesticrebel.com/wp-content/uploads/2015/08/DSC_0317A.jpg"
    }, {
    "name": "Cinnamon Roll French Toast Casserole",
    "ingredients": "Casserole: 2 (17.5 oz.) cans refrigerated cinnamon rolls, icing reserved; 2 Tbsp. melted butter; 4 eggs; ⅓ c. milk; 1 Tbsp. cinnamon; 1 tsp. vanilla; Icing: ½ c. powdered sugar; 2 containers reserved icing; 2 Tbsp. cream cheese, softened; 1 Tbsp. milk (For extra icing, combine ¾ c. powdered sugar + 3 oz. cream cheese (softened) + 1½ Tbsp. milk)",
    "instructions": "Preheat oven to 350 degrees. Remove cinnamon rolls from packages and cut each roll into sixths. Drizzle melted butter in 9x13 inch pan. Spread cinnamon roll pieces evenly in pan. In a separate bowl, combine eggs, milk, cinnamon, and vanilla. Whisk until combined. Pour egg mixture over cinnamon rolls. Bake at 350 degrees for 30-35 minutes or until top of casserole is golden brown and center is set. Prepare icing by combining reserved cinnamon roll icing with ½ c. powdered sugar, 2 Tbsp. softened cream cheese, and 1 Tbsp. milk. Whisk until smooth. Pour icing evenly over casserole.",
    "image": "https://whereevilthoughts.files.wordpress.com/2013/07/crafty-food-6-cheese-and-hot-dog.jpg"
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
    this.setState({recipes: recips});
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
      <h1 className="title">Recipe Box</h1>
    );
  }
}

//responsible for viewing and editing recipes
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
        <h4 className="editError"></h4>
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
    if (this.refs.newName.value === "") {
      alert('You must enter a recipe name.');
      this.setState({
        editing: true,
        viewing: false
      });
      return false;
    }
    if (this.refs.newIng.value === "") {
      alert('You must enter some ingredients.');
      this.setState({
        editing: true,
        viewing: false
      });
      return false;
    }
    if (this.refs.newInstr.value === "") {
      alert('You must enter some instructions.');
      this.setState({
        editing: true,
        viewing: false
      });
      return false;
    }
    var index = this.props.index;
    var newName = this.refs.newName.value;
    var newIng = this.refs.newIng.value;
    var newInstr = this.refs.newInstr.value;
    var newImg = this.refs.newImg.value;
    if (newImg === "") {
      newImg = "./noImg.jpg";
    }
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
  //default when app is loaded/no recipes are opened
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
    if (this.refs.newName.value === "") {
      alert('You must enter a recipe name.');
      this.setState({
        modalIsOpen: true
      });
      return false;
    }
    if (this.refs.newIng.value === "") {
      alert('You must enter some ingredients.');
      this.setState({
        modalIsOpen: true
      });
      return false;
    }
    if (this.refs.newInstr.value === "") {
      alert('You must enter some instructions.');
      this.setState({
        modalIsOpen: true
      });
      return false;
    }
    var newName = this.refs.newName.value;
    var newIng = this.refs.newIng.value;
    var newInstr = this.refs.newInstr.value;
    var newImg = this.refs.newImg.value;
    if (newImg === "") {
      newImg = "./noImg.jpg";
    }
    this.props.addRecipe(newName, newIng, newInstr, newImg);
    this.setState({ modalIsOpen: false });
  }
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  afterOpenModal() {
    //references are now sync'd and can be accessed.
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