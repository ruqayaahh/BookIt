import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { login } from "../apis/requests.js";

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleOnClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      for (const key in userData) {
        if (!userData[key as keyof typeof userData]) {
          window.alert("All fields must be filled.");
        } else {
          const result = await login(userData);
          console.log(result, "result");
          navigate(`/dashboard/${result._id}`);
        }
      }
    } catch (error) {
      console.log(error, "error in login");
    }

    // {_id: 10, firstname: 'ree', lastname: 'gvcv', email: 'ssc', password: 'bvc'}
  };
  return (
    <Stack spacing={4} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<ViewIcon color="gray.300" />}
        />
        <Input
          type="email"
          placeholder="Email"
          size="md"
          variant="flushed"
          name="email"
          value={userData.email}
          onChange={(e) => handleOnChange(e)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<ViewIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Password"
          size="md"
          variant="flushed"
          name="password"
          value={userData.password}
          onChange={(e) => handleOnChange(e)}
        />
      </InputGroup>
      <p>
        New User? <Link to="/signup">Signup</Link>
      </p>
      <Button
        colorScheme="teal"
        size="md"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Login
      </Button>
    </Stack>
  );
}

export default Login;
