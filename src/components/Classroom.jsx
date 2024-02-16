import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw4/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h1>Badger Book - Fall 2023</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control id="searchName" />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control id="searchMajor" />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control id="searchInterest" />
        <br />
        <Button variant="neutral">Reset Search</Button>
      </Form>
      <p>There are {studentData.length} student(s) matching your search.</p>
      <Container fluid>
        <Row>
          {studentData.map((data) => {
            return <Student key={data.id} name={data.name}></Student>;
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Classroom;
