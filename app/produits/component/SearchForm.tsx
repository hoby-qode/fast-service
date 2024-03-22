import styles from '@/components/SearchBar/searchBar.module.css'
import {FC} from 'react'

interface SearchFormPropsType {
    handleSubmit: (text:string) => void
}
const SearchForm: FC<SearchFormPropsType> = ({handleSubmit}) => {
    return (
        <form className={`${styles.searchBar_content} w-full`} onSubmit={handleSubmit}>
            <input
            type="search"
            name="s"
            className={styles.searchBar_input}
            placeholder="Faite vos recherches |"
            />
            <button type="submit">Search</button>
        </form>
    )
}
export default SearchForm