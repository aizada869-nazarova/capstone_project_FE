<Form className='main-form' >
{/* onSubmit={handleSubmit} */}
    <Container >
      <Row className="d-flex justify-content-center">
        <Col md={6}>
        
          <h1 className="mb-5 text-light"><strong>Log in</strong></h1>
          <Form.Label className="text-light">Email address</Form.Label>
          <Form.Control
            className="rounded-pill"
            type="email"
            placeholder="Enter email"
            // value={data.email}
            // onChange={(e) => {
            //   handleInput("email", e.target.value);
            // }}
          />
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control
            className="rounded"
            id="password"
            // value={data.password}
            // onChange={(e) => {
            //   handleInput("password", e.target.value);
            // }}
            type="password"
            placeholder="Enter password"
          />
          <div className="mt-4 d-flex inline-block">
          <Button variant="success" type="submit" className="mr-3 rounded-pill">
            Sign in
          </Button>
          <p className="mt-2 text-light" style={{ textDecoration: "underline" }}>Or</p>
          <a href="http://localhost:3001/users/googleLogin">
          <Button variant="light" type="submit" className=" ml-3 rounded-pill">
            <FcGoogle style={{ fontSize: "25px" }}/>
            Continue with Google
          </Button>
          </a>
          </div>
        </Col>
      </Row>
    </Container>
  </Form>