import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signup } from "../apis/requests.js";

function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleOnClick = async () =>
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    {
      // event.preventDefault();
      try {
        for (const key in userData) {
          if (!userData[key as keyof typeof userData]) {
            window.alert("All fields must be filled.");
          } else {
            const result = await signup(userData);
            console.log(result, "result");
            navigate(`/dashboard/${result._id}`);
          }
        }
      } catch (error) {
        console.log(error, "error in signup");
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
          type="text"
          placeholder="First Name"
          size="md"
          variant="flushed"
          name="firstname"
          value={userData.firstname}
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
          placeholder="Last Name"
          size="md"
          variant="flushed"
          name="lastname"
          value={userData.lastname}
          onChange={(e) => handleOnChange(e)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<EmailIcon color="gray.300" />}
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
          children={<ViewOffIcon color="gray.300" />}
        />
        <Input
          type="password"
          placeholder="Password"
          size="md"
          variant="flushed"
          name="password"
          value={userData.password}
          onChange={(e) => handleOnChange(e)}
        />
      </InputGroup>
      <Button
        colorScheme="teal"
        size="md"
        onClick={() => {
          handleOnClick();
        }}
      >
        Button
      </Button>
    </Stack>
  );
}

export default Signup;
