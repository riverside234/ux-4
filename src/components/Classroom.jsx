import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
  const [studentData, setStudentData] = useState([]);

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  let count = 1;

  const [searchNameValue, setsearchNameValue] = useState("");
  const handleSearchName = (e) => {
    setsearchNameValue(e.target.value);
    setcurrPage(1);
  };

  const [searchMajorValue, setsearchMajorValue] = useState("");
  const handlesearchMajor = (e) => {
    setsearchMajorValue(e.target.value);
    setcurrPage(1);
  };

  const [searchInValue, setsearchInValue] = useState("");
  const handlesearchIn = (e) => {
    setsearchInValue(e.target.value);
    setcurrPage(1);
  };

  useEffect(() => {
    setStudentData((oldData) =>
      oldData.filter((student) => {
        if (
          (searchNameValue === "" ||
            (student.name.first + student.name.last)
              .toLowerCase()
              .match(
                searchNameValue.toLowerCase().trim().replace(/\s/g, "")
              )) &&
          (searchMajorValue === "" ||
            student.major
              .toLowerCase()
              .match(
                searchMajorValue.toLowerCase().trim().replace(/\s/g, "")
              )) &&
          (searchInValue === "" ||
            student.interests.some((stu) => {
              return stu
                .toLowerCase()
                .match(searchInValue.toLowerCase().trim().replace(/\s/g, ""));
            }))
        ) {
          return true;
        }
      })
    );
  }, [searchNameValue, searchMajorValue, searchInValue]);

  const reSet = () => {
    setsearchNameValue("");
    setsearchInValue("");
    setsearchMajorValue("");
    setcurrPage(1);
    fetchData();
  };

  const [currPage, setcurrPage] = useState(1);

  let totalPage;

  const buildPagination = (length) => {
    let page = [];
    totalPage = Math.ceil(length / 24);

    for (let number = 1; number <= totalPage; number++) {
      page.push(
        <Pagination.Item
          key={number}
          active={currPage === number}
          onClick={() => {
            setcurrPage(number);
          }}
        >
          {" "}
          {number}
        </Pagination.Item>
      );
    }
    return page;
  };

  return (
    <div>
      <h1>Badger Book - Fall 2023</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={searchNameValue}
          onChange={handleSearchName}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={searchMajorValue}
          onChange={handlesearchMajor}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={searchInValue}
          onChange={handlesearchIn}
        />
        <br />
        <Button variant="neutral" onClick={reSet}>
          Reset Search
        </Button>
      </Form>
      <p>There are {studentData.length} student(s) matching your search.</p>
      <Container fluid>
        <Row>
          {studentData.slice((currPage - 1) * 24, currPage * 24).map((data) => {
            count = count + 1;
            return (
              <Col
                key={data.id + count.toString()}
                xs={12}
                sm={8}
                md={6}
                lg={3}
                xl={2}
              >
                <Student {...data}></Student>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Pagination>
        <Pagination.Prev
          disabled={currPage === 1 ? true : false}
          onClick={() => setcurrPage((prepage) => prepage - 1)}
        />
        {buildPagination(studentData.length)}
        <Pagination.Next
          disabled={currPage === totalPage ? true : false}
          onClick={() => setcurrPage((prepage) => prepage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default Classroom;
