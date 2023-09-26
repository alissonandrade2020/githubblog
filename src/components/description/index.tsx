import { Buildings, ArrowUpRight, GithubLogo, UserCirclePlus } from 'phosphor-react';
import { DescriptionCard, DescriptionContainer, Button, Input } from './styles';
import api from "../../services/api";
import { useState } from 'react';

export function Description() {
    const [search, setSearch] = useState("");

    const handleSearch = () => {    
        api
        .get(`/users/${search}`)
        .then((response) => setSearch(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }
    
  return (
    <DescriptionContainer>           
      <DescriptionCard>
        <header>

        {!search ? (
              <h1>Nenhuma informação encontrada</h1>
            ) : (      
             <>
             <img src={ search?.avatar_url } alt="" style={{ borderRadius: "6px", width: "12rem" }} /> 
            <div style={{ marginTop: '10px', padding: "20px" }}>
                <h3 style={{ alignItems: "center", color:"#3294f8", fontSize: "25px" }}> { search?.name } </h3>

                 <h3 style={{ marginTop: '10px', color: "#5d6e80" }}>{ search?.bio }</h3>

                <div style={{ display: "flex", marginTop: '12px', padding: "2px", justifyContent: 'space-between'}} >
                            <GithubLogo  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: "-22px"  }}> { search?.login }</h3>
                            <Buildings  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: "-22px"  }}>  { search?.company } </h3>      
                            <UserCirclePlus  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: "-22px"  }}> { search?.followers } seguidores</h3>
                
                </div>
            
            </div>

            <strong style={{ color:"#3294f8", marginTop: "-80px", marginLeft: "160px", fontSize: "20px" }} ><a href={`https://github.com/${search.login}`} target="_blank" rel="guthub"><ArrowUpRight  size={25} color="#3294f8" style={{ marginLeft: "80px"}}/><p style={{ marginTop: "-30px", color:"#3294f8", textDecoration: "none" }}>GITHUB</p> </a> 
            </strong>
             </> 
            )
            }
        </header>
      </DescriptionCard>
      <div className='flex'>
                <h1>Digite seu perfil no GITHUB</h1>  <br />
                <Input                 
                    type="text" 
                    placeholder='Digite um username' 
                    onChange={(e) => setSearch(e.target.value)}
                
                />
              
                <Button onClick={handleSearch} >Buscar</Button>
            </div>
    </DescriptionContainer>
  )
}