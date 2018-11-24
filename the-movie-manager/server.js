const express = require("express")
const Sequelize = require("sequelize")


const sequelize = new Sequelize('themoviemanager', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
})

sequelize.authenticate().then(function(){
    console.log('success')
}).catch(function(){
    console.log('there was an error connecting to db')
})

const Movies = sequelize.define('movies', {
    movie_id: {
        type: Sequelize.INTEGER,
        field: 'movie_id'
    },
    imdb_id: {
        type: Sequelize.INTEGER,
        field: 'imdb_id'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    release_date: {
        type: Sequelize.DATE,
        field: 'release_date'
    },
    homepage: {
        type: Sequelize.STRING,
        field: 'homepage'
    },
    rating: {
        type: Sequelize.INTEGER,
        filed: 'rating'
    },
    movie_type: {
        type: Sequelize.STRING,
        field: 'type'
    },
    overview: {
        type: Sequelize.TEXT,
        field: 'overview'
    }
});

const Genres = sequelize.define('genres', {
    genre_id: {
        type: Sequelize.INTEGER,
        field: 'genre_id'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    description: {
        type: Sequelize.TEXT,
        field: 'description'
    }
});

const Cast = sequelize.define('cast', {
   
    character_name: {
        type: Sequelize.STRING,
        field: 'character_name'
    },
    role_type: {
        type: Sequelize.STRING,
        field: 'role_type'
    }
});

const Actors = sequelize.define('actors', {
   
   actor_id: {
       type: Sequelize.INTEGER,
       field: 'actor_id'
   },
    actor_name: {
        type: Sequelize.STRING,
        field: 'actor_name'
    },
    wiki_url: {
        type: Sequelize.STRING,
        field: 'wiki_url'
    }
});

const Users = sequelize.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    join_date: {
        type: Sequelize.DATE,
        field: 'join_date'
    },
    description_id: {
        type: Sequelize.INTEGER,
        field: 'description_id'
    }
});

Movies.belongsTo(Users);
Movies.belongsTo(Genres);
Cast.belongsTo(Movies);
Cast.belongsTo(Actors);

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use('/', express.static("static"))

app.get('/createdb', function(request, response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('tables created')
    }).catch(function(){
        response.status(200).send('could not create tables')
    })
})


app.listen(8080)


