import styles from '@/components/SearchBar/searchBar.module.css'

const SearchForm = () => {
    return (
        <div className={styles.searchBar_content}>
            <input
            type="search"
            name="s"
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchBar_input}
            placeholder="Faite vos recherches |"
            onFocus={() => setShowContainerResult(true)}
            onBlur={() =>
                searchResults.length == 0
                ? setShowContainerResult(false)
                : setShowContainerResult(true)
            }
            />
        </div>
    )
}
export default SearchForm