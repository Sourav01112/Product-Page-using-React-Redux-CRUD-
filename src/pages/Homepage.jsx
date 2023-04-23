import { useState, useEffect } from "react";
import { ProductList } from "../components/ProductList";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { FaArrowCircleUp } from "react-icons/fa";

export const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get("page");
  const initialOrder = searchParams.get("order");
  const [page, setPage] = useState(+initialPage || 1);
  const [order, setOrder] = useState(initialOrder || "");

  const handleSort = (e) => {
    const { value } = e.target;
    setOrder(value);
  };

  //****************  Scroll to Top   **************
  const [isTop, setIsTop] = useState(true);

  //using useEffect to make sure sideEffects are being managed

  useEffect(() => {
    const handleScroll = () => {
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.pageYOffset < threshold / 2) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsTop(true);
  };
  //****************  Scroll to Top  ENDS **************

  return (
    <>
      <DIV>
        {/* SideBar */}
        <div className="sidebar">
          <Sidebar order={order} setOrder={setOrder} page={page} />
        </div>

        {/* //SORT BY PRICE filter */}
        <div className="productList">
          <div
            style={{
              textAlign: "end",
              marginBottom: "10px",
              // border: "2px solid red",
            }}
          >
            <select onChange={handleSort} value={order}>
              <option value={""}>Sort by price</option>
              <option name="order" value={"asc"}>
                Price(Lowest)
              </option>
              <option name="order" value={"desc"}>
                Price(Highest)
              </option>
            </select>
          </div>

          {/* ProductList */}
          <ProductList page={page} setPage={setPage} />
        </div>
      </DIV>

      {/* To top button :- CHAKRA */}

      <Box position="fixed" bottom="2rem" right="0.5rem">
        {isTop && (
          <FaArrowCircleUp color="#3470e4" size={30} onClick={scrollToTop} />
        )}
      </Box>

      <br />
    </>
  );
};

const DIV = styled.div`
  display: flex;
  /* border: 2px solid gray; */
  background-color: #fdfdfd;

  .sidebar {
    background-color: white;
    /* border: 2px solid red; */
    width: 25%;
    margin-top: 30px;
    margin-right: 40px;
    text-align: center;
    position: fixed;
    height: 100%;
    margin-top: 100px;
    top: 0;
    left: 0;
  }
  .productList {
    /* border: 2px solid blue; */
    width: 70%;
    overflow-y: auto;
    margin-left: 27%;
  }
`;
