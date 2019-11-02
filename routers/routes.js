const express= require('express')
const router = express.Router();
const fs=require('fs')

data =JSON.parse(fs.readFileSync('courses.json').toString())
students = JSON.parse(fs.readFileSync('students.json').toString())
router.get('/add_student', (req, res)=>{
    res.render('addStudent',{
        title:'add student'
    })
})

router.get('/add_course', (req, res)=>{
    res.render('addCourse', {
        title:'add course'
    })
})


router.get('/insert_course_data',(req,res)=>{
    title = req.query.title
    price = req.query.price
    content = req.query.content
    course = {title, price, content}
    data.push(course)
    fs.writeFileSync('courses.json',JSON.stringify(data))
    console.log('data', course)
    res.redirect(301,'/allCourses')
})


router.get('/insert_student_data',(req,res)=>{
    id = req.query.id
    userName = req.query.userName
    student = {id, userName}
    index = students.findIndex((single)=>{
        return single.userName == userName 
    })

    if(parseInt(id)<10000){
        throw new Error('invalid id')
    }
    else if(index>=0){
        console.log('sut', students)
        throw new Error('invalid user name')
        
    }
    else{
    
    students.push(student)
    fs.writeFileSync('students.json',JSON.stringify(students))
    console.log('students', student)
    // res.redirect(301,'/allStudents')
    
    res.render('allStudents',{
        title:'all students',
        students: students
    })
}
})


router.get('/allCourses', (req, res)=>{
    res.render('allCourses', {
        title:'all courses',
        data:data
    })
})


router.get('/:title',(req,res)=>{
    const title = req.params.title
    const url = fs.readFileSync('courses.json').toString();
    const data = JSON.parse(url);
    studata = JSON.parse(fs.readFileSync('students.json').toString())
    // selectedValue = req.body.selected
    // console.log('selected= ', selectedValue)
    // request({url:url},(error,response)=>{
    //     data=JSON.parse(response.body)
    //     // data = data.nativeName
        index = data.findIndex(function(single){
            return single.title == title
        })
        res.render('singleCourse',{
            title:'single course',
            data: data[index],
            students:studata
        })
    })







module.exports = router