import styles from '@/components/search-bar/searchBar.module.css'
import {FC} from 'react'
import { TbSearch } from 'react-icons/tb'

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
            <button type="submit" 
            className={styles.searchsBar_content_icon}>
                <TbSearch />
            </button>
        </form>
    )
}
export default SearchForm