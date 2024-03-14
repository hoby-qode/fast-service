import styles from '@/components/SearchBar/searchBar.module.css'
import {FC} from 'react'

interface SearchFormPropsType {
    searchText: string
    onChangeSearchText: (text:string) => void
}
const SearchForm: FC<SearchFormPropsType> = ({searchText, onChangeSearchText}) => {
    return (
        <div className={`${styles.searchBar_content} w-full`}>
            <input
            type="search"
            name="s"
            onChange={(e) => onChangeSearchText(e.target.value)}
            className={styles.searchBar_input}
            placeholder="Faite vos recherches |"
            />
        </div>
    )
}
export default SearchForm