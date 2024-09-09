import { IBookPreview } from "../search/Search";
import "./BookPreview.css"

interface IProps {
    book: IBookPreview
}

function BookPreview(props: IProps) {
    const book = props.book;
    return (
        <div className="book-preview">
            <img src={book.imageLinks?.smallThumbnail} />
            <p className="title">{book.title}</p>
            <div>{ book.authors?.map((a, i) => <p className="author" key={i}>{a}</p>) }</div>
        </div>
    );
}

export default BookPreview;
