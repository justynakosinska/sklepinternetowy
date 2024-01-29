import React, { useState } from "react";
import style from './Pagination.module.scss'

const Pagination =({currentPage,setCurrentPage,productsPerPage,totalProducts})=>{
    
    const pageNumbers=[]
    const totalPages = totalProducts / productsPerPage;
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      // GO to next page
      const paginateNext = () => {
        setCurrentPage(currentPage + 1);
        // Show next set of pageNumbers
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };
    
      // GO to prev page
      const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        // Show prev set of pageNumbers
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      };
    
      for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
      }
      // console.log(pageNumbers);
    
      return (
        <ul className={style.pagination}>
          <li
            onClick={paginatePrev}
            className={currentPage === pageNumbers[0] ? `${style.hidden}` : null}
          >
            Poprzednia
          </li>
    
          {pageNumbers.map((number) => {
            if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
              return (
                <li
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? `${style.active}` : null}
                >
                  {number}
                </li>
              );
            }
          })}
    
          <li
            onClick={paginateNext}
            className={
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? `${style.hidden}`
                : null
            }
          >
            Następna
          </li>
    
          <p>
            <b className={style.page}>{`strona ${currentPage}`}</b>
            <span>{` z `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
          </p>
        </ul>
      );
    };
    
    export default Pagination;