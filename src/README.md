# <u>Pokemon-Pokedex</u> #

## <u>Description</u> ##

My Pokemon project involves creating an API using React that organizes a dataset of Pokemon. Basically, I'm making a website where people can search for their favorite Pokemon and save them to their favorites.

To do this, I'll need to use a dataset that has information about all the different Pokemon, like their names, types, moves, and abilities. Then, I'll design an API that lets people search for Pokemon based on things like their name or type. I'll also create a way for people to save their favorite Pokemon so they can easily find them again later.

Overall, I'm making a really cool website that lets people interact with Pokemon data in a fun and user-friendly way!

## <u>Deployment link</u> ##

The Project is now live and can be accessed without any specific requirements.

<li>Git repository:<mark>LINK HERE</mark></li>
<li>Pokemon-Pokedex-Project:<mark>LINK HERE</mark></li>

## <u>Installation</u> ##

You don't need to install anything to play this game. All you need is a web browser that supports JavaScript and an internet connection.

## <u>Technologies used</u> ##

<li> React </li>
<li> CSS </li>
<li> Javascript </li>
<li> HTML </li>

## <u>Planning</u> ##

Before diving into the design process of my project, I took some time to plan it out properly. To begin, I created a preliminary low-fidelity wireframe to sketch out a rough outline of the design. This allowed me to visualize the overall structure and layout of the game, which was essential for creating a clear vision of what the finished product would look like.

I used multiple methods to plan out the structure and functionality of the API. Oneof these methods involved writing pseudocode, which helped me to outline andorganize the different components and functions of the API. By creating a structured representation of the code, I was able to better visualize how the various elementsof the API would interact and work together.

In addition to creating wireframes, utilizing pseudocode was an effective way for me to stay organized and focused throughout the development process. This technique helped me to track my progress, make any necessary adjustments, and ensure that the final product met the requirements and expectations. Ultimately, combining these planning techniques resulted in a more streamlined and efficient development process.

## <u>Pseudocode</u> ##

Please take a look at the pseudocode I have created for my project.
```js
FUNCTION search_pokemon(pokedex, name):
    FOR each pokemon in pokedex:
        IF pokemon.name == name:
            RETURN pokemon
    RETURN null

FUNCTION add_to_favorites(pokemon):
    ADD pokemon TO favorites_list

FUNCTION remove_from_favorites(pokemon):
    REMOVE pokemon FROM favorites_list

FUNCTION display_pokemon_info(pokemon):
    PRINT "Name: " + pokemon.name
    PRINT "Type: " + pokemon.type
    PRINT "Height: " + pokemon.height
    PRINT "Weight: " + pokemon.weight
    PRINT "Description: " + pokemon.description

FUNCTION generate_random_pokemon():
    CREATE pokemon
    SET pokemon.name = random_name
    SET pokemon.type = random_type
    SET pokemon.height = random_height
    SET pokemon.weight = random_weight
    SET pokemon.description = random_description
    RETURN pokemon

START:
    CREATE pokedex
    CREATE favorites_list
    WHILE true:
        PRINT "Enter a Pokemon name to search, 'generate' for a random Pokemon:"
        READ user_input
        IF user_input == "generate":
            pokemon = generate_random_pokemon()
            display_pokemon_info(pokemon)
            PRINT "Add to favorites? (y/n)"
            READ add_favorite
            IF add_favorite == "y":
                add_to_favorites(pokemon)
        ELSE:
            pokemon = search_pokemon(pokedex, user_input)
            IF pokemon != null:
                display_pokemon_info(pokemon)
                PRINT "Add to favorites? (y/n)"
                READ add_favorite
                IF add_favorite == "y":
                    add_to_favorites(pokemon)
            ELSE:
                PRINT "Pokemon not found."
```

## <u>Wireframes</u> ##

Here are the wireframes I made for my project.

### <u>Low fidelity wireframe:</u> ###
![alt text](Group%201.png)
![alt text](Group%202.png)
![alt text](Group%203.png)