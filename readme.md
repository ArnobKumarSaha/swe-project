This is the backend of software project. It listens on http://localhost:3000/. 



## Install NodeJS
If you don't have nodeJS installed yet, you can do this easily by follwing this commads one by one (for Linux Machine): 

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

`source $HOME/.bashrc`

`nvm install 16.13.0`

nodeJS version >= v16.13.0 is required

For Other Operating systems , follow this link https://nodejs.org/en/download/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```
This command will start the development server with help of nodemon.

## Project Description 

### Why this project ? 
The universities of Bangladesh don't have an automated system to handle the projects and courses it provides. SUST is not exception too.  We eagerly wanted to make a reliable system to do this job. 

### What's in this project ? 
There are three types of Users in this project. Student, Teacher & Admin. 

1) Students can add project, show the deatils of their and other's projects. They can apply for thesis, register to course & can see the details of their taken courses as well as taken courses of other students.

2) Teacher can register in this system by themselves. See & edit their Profiles pages. Accept the thesis request requests added by Students.

3) Admin has some super-powers. They can't register directly though. We have set an Admin hardcoded in the Database , as they cant register themselves. Admins can add other admins. Add, edit & delete teachers . Add, edit and delete courses. etc.