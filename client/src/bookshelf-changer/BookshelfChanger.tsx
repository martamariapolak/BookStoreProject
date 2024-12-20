import { useContext, useEffect, useState } from "react";
import { IBookPreview } from "../search/Search";
import axios from "axios";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import { IBookshelf } from "../bookshelf/Bookshelf";

export interface IBookshelfChangerProps {
	book?: IBookPreview;
}

function BookshelfChanger(props: IBookshelfChangerProps) {
	const [bookshelf, setBookshelf] = useState("none");
	const { getToken } = useContext(AccessTokenContext);
	const [wantToRead, setWantToRead] = useState<IBookPreview[]>([]);
	const [currentlyReading, setCurrentlyReading] = useState<IBookPreview[]>([]);
	const [read, setRead] = useState<IBookPreview[]>([]);
	const [errorMessage, setErrorMessage] = useState("");

	function findShelf() {
		if (props.book) {
			return props.book.shelf;
		}
		return "none";
	}

	async function fetchBookshelf() {
		try {
			const response = await fetch(`/api/bookshelf`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${getToken()}`
				}
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setWantToRead(data.books.wantToRead);
			setCurrentlyReading(data.books.currentlyReading);
			setRead(data.books.read);
			const shelf = findShelf();
			setBookshelf(shelf ?? "none");
		}
		catch (error) {
			console.error(error);
			setErrorMessage("We are sorry, unexpected error occurred.");
		}
	}


   

	async function updateBookshelf(bookshelf: string) {
		try {
			const response = await fetch(`/api/bookshelf/${props.book?.id}/${bookshelf}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${getToken()}`
				}
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			setBookshelf(bookshelf);
		}
		catch (error) {
			console.error(error);
			setErrorMessage("We are sorry, unexpected error occurred.");
		}
	}

	useEffect(() => {
        fetchBookshelf();
    }, []);

	
	//const handleChange = (event: { target: { value: string; }; }) => {updateBookshelf(event.target.value); axios. get<IBookshelf>(
               //    `/api/bookshelf`);		  }

	const handleChange = (event: { target: { value: string; }; }) => {updateBookshelf(event.target.value);}
	return (
		<div className="book-shelf-changer">
			<select value={bookshelf} onChange={handleChange}>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
			{errorMessage && (
				<div className="alert alert-danger" role="alert">
					{errorMessage}
				</div>
			)}
		</div>
	);
}

export default BookshelfChanger;
