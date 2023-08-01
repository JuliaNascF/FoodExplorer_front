import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`; 

export const Container = styled.div`
 width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10.5rem auto 8rem;
    grid-template-areas:
    "header"
    "content"
    "footer";
  `;

export const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  flex-wrap:wrap;
  gap: 20px;
 
  &::-webkit-scrollbar {
        width: 22px;
         
  }
    
   &::-webkit-scrollbar-thumb {
     background-color: transparent;
     border-radius: 80px;
     box-shadow: inset 0 0 0px 6px ${({ theme }) => theme.COLORS.BLUE};
     border: solid 10px transparent;
 }

    .back{
    display: flex;
    gap: 5px;
    margin-left: 35rem;
    margin-top: 49rem;

    h3{
      font-size:25px;
    }


    @media only screen and (max-width: 768px) {
      margin-left: 2rem;
     }
     
  }

 p{
  font-size: 35px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10%;
 }

  

  .favorites{
   margin: 3rem;
    display:flex;
    flex-wrap: wrap;
    gap: 5rem;
    justify-content:center;
  }

  .favorite{
    cursor: pointer;
    display:flex;
    justify-content: center;
    gap: 10px;
    

    .detailsDish{
      display: flex;
      flex-direction: column;
    }


    >p{
      font-size:20px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }

  
  }

  img{
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover
  }

    h1{
      font-size: 20px;
      color:${({ theme }) => theme.COLORS.WHITE};
      margin-top: 20px;
    }

    .loading-spinner {
   margin-top: 30%;
 animation:${spin} 1s linear infinite;
}

   
`;