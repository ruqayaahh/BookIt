import * as React from "react";

type Props = {};

export default function LentOut({}: Props) {
  const library = [
    {
      _id: 1,
      name: "Testing",
      author: "Testing",
      edition: "Testing",
      in_custody: true,
      is_read: true,
      category: "Testing",
      review: "Testing",
      user_id: 1,
      photo: "Testing",
    },
  ];
  return (
    <div>
      <ul>
        {library?.map((book, index: number) => (
          <li key={index}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}
