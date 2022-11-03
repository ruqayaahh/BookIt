import * as React from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { saveNewBook } from "../apis/requests";

type Book = {
  _id: number;
  title: string;
  author: string;
  edition?: string;
  in_custody: boolean;
  is_read?: boolean;
  category?: string;
  review?: string;
  user_id: number;
  photo?: string;
};

export type Library = {
  books: Book[];
};
type LibraryPropsType = {
  library: Library;
  userId: string;
  setRefetch: Function;
};

export default function Library({
  library: { books },
  userId,
  setRefetch,
}: LibraryPropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBookData, setNewBookData] = React.useState({
    title: "",
    author: "",
  });
  const disabled = !newBookData.title || !newBookData.author;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBookData({ ...newBookData, [name]: value });
  };
  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const payload = { ...newBookData, is_read: false, in_custody: true };
      const result = await saveNewBook(userId, payload);
      console.log(result, "result");
      setRefetch(true);
      setNewBookData({
        title: "",
        author: "",
      });
      onClose();
    } catch (error) {
      console.log(error, "error in signup");
    }
  };
  return (
    <div>
      {books?.length > 0 ? (
        <>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
          >
            Add a book to your library
          </Button>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Book title</Th>
                  <Th>Author</Th>
                  <Th>In Custody</Th>
                  <Th>Read</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books?.map((book, index: number) => (
                  <Tr key={index}>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.in_custody}</Td>
                    <Td>{book.is_read}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Book title</Th>
                  <Th>Author</Th>
                  <Th>In Custody</Th>
                  <Th>Read</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={onOpen}
        >
          Add a book to your library
        </Button>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add your new Book to your personal online library
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Book Title</FormLabel>
              <Input
                placeholder="Title"
                name="title"
                value={newBookData.title}
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Author"
                name="author"
                value={newBookData.author}
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="outline" spacing="6">
              <Button
                colorScheme="teal"
                isDisabled={disabled}
                onClick={(e) => handleSave(e)}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
