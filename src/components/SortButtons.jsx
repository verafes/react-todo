import PropTypes from 'prop-types';
import style from './SortButtons.module.css';

function SortButtons({ sortField, sortOrder, handleSortToggle }) {
    return (
        <div className={style.sortButtonContainer}>
            <button onClick={() => handleSortToggle("title")}>
                Sort by Title {sortField === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            <button onClick={() => handleSortToggle("createdTime")}>
                Sort by Date {sortField === "createdTime" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
        </div>
    );
}

SortButtons.propTypes = {
    sortField: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    handleSortToggle: PropTypes.func.isRequired,
};

export default SortButtons;