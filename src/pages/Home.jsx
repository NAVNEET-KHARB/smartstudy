import React from "react";
import Container from "../components/container/Container";
import Boy from "./boy.png";
import { Link } from "react-router-dom";
import Slider from "../components/slider/Slider";

function Home() {
  return (
    <div className="w-full py-8">
      <Container>
        <div className="container mx-auto mt-10 px-4">
          <Slider/>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Browse Our Top Courses
            </h1>
            <p className="text-xl mt-4 mb-6 text-gray-700">
              Discover a wide range of courses designed to help you master new
              skills, advance your career, or dive into a new passion. Whether
              you're a beginner or an expert, we have something for everyone.
              Explore our top-rated courses below.
            </p>

            <div className="mt-8">
              <hr className="my-4 border-gray-300" />
              <div className="bg-gray-200 p-6 rounded-lg">
                <h1 className="text-4xl font-bold">Web Development</h1>
                <div className="flex flex-col md:flex-row mt-4 gap-4">
                  <div className="md:w-1/2">
                    <p className="text-lg text-center md:text-left">
                      The Web Development course covers the entire spectrum of
                      modern web technologies and best practices, ensuring
                      you’re well-equipped to build responsive, user-friendly
                      websites and applications. You will work on multiple
                      real-world projects throughout the course that mimic
                      industry scenarios.
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src={Boy}
                      alt="Student studying"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                </div>
                <Link to="/all-courses">
                  <button className="border-2 border-white mt-4 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-700">
                    Check Out
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold">DSA</h2>
                  <p className="mt-4">
                    Our DSA course offers a thorough understanding of core data
                    structures and algorithms essential for efficient coding and
                    problem-solving. You’ll learn how to approach coding
                    challenges with clarity and precision, making you proficient
                    in building optimized solutions.
                  </p>
                  <Link to="/all-courses">
                    <button className="border-2 border-white mt-4 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-700">
                      Check Out
                    </button>
                  </Link>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold">System Design</h2>
                  <p className="mt-4">
                    Our System Design course covers the foundational and
                    advanced principles required to design large-scale systems,
                    helping you prepare for system design interviews and
                    real-world applications.
                  </p>
                  <Link to="/all-courses">
                    <button className="border-2 border-white mt-4 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-700">
                      Check Out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-300" />

          <div className="text-center mt-10">
            <h3 className="text-3xl font-normal text-gray-900">MORE COURSES</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661414423895-5854eb6b573a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2hub2xvZ3klMkNkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="HTML & CSS"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold">HTML & CSS</h5>
                  <p className="mt-2 text-gray-700">
                    Master the building blocks of the web to create visually
                    appealing and accessible sites. This HTML and CSS course is
                    designed for beginners who want to learn the fundamentals of
                    web development. You’ll gain a solid understanding of how to
                    create and style websites, using HTML for structure and CSS
                    for design. By the end of the course, you'll be able to
                    build responsive and visually appealing web pages.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 text-center">
                  <small className="text-gray-500">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neSUyQ2RldmVsb3BtZW50fGVufDB8fDB8fHww"
                  alt="JavaScript"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold">JavaScript</h5>
                  <p className="mt-2 text-gray-700">
                    Learn the fundamentals of JavaScript, the language that
                    powers the interactivity of websites. This JavaScript course
                    is designed for beginners and intermediate learners who want
                    to master JavaScript, the most popular programming language
                    for web development. You’ll learn how to create interactive
                    and dynamic web applications using JavaScript, including
                    modern features and best practices.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 text-center">
                  <small className="text-gray-500">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Python"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold">Python</h5>
                  <p className="mt-2 text-gray-700">
                    Dive into Python programming and learn how to build
                    applications, analyze data, and automate tasks. This Python
                    course covers everything from basic syntax to advanced
                    topics, preparing you for a variety of programming
                    challenges and real-world projects.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 text-center">
                  <small className="text-gray-500">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-300" />

          <div className="flex flex-col lg:flex-row-reverse items-center gap-6 py-12 bg-gray-200 rounded-lg mt-10">
            <div className="w-full lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Variety of courses"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                We also provide a variety of courses in various fields.
              </h1>
              <p className="text-lg text-gray-700">
                <span className="text-2xl font-semibold">
                  Why Choose Our Courses?
                </span>
                <p className="mt-2">
                  <strong>Expert Instructors:</strong> Learn from industry
                  professionals and experienced educators.
                </p>
                <p className="mt-2">
                  <strong>Flexible Learning Options:</strong> Both online and
                  in-person classes to fit your schedule.
                </p>
                <p className="mt-2">
                  <strong>Comprehensive Curriculum:</strong> Covering essential
                  skills and the latest trends in your field.
                </p>
                <p className="mt-2">
                  <strong>Affordable Pricing:</strong> Quality education at
                  competitive rates.
                </p>
                <p className="mt-2">
                  <strong>Certification:</strong> Gain recognized certifications
                  to boost your career prospects.
                </p>
                <p className="mt-2">
                  <strong>Supportive Learning Community:</strong> Connect with
                  peers and mentors for guidance and networking.
                </p>
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <Link to="/all-courses">
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600"
                  >
                    EXPLORE NOW!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
