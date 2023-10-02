import { Buildings, ArrowUpRight, GithubLogo, UserCirclePlus, MapPin, Stack } from 'phosphor-react';
import { DescriptionCard, DescriptionContainer, Button, Input, CardIssues, CardIssuesContainer } from './styles';
import api from "../../services/api";
import { useState } from 'react';

type GITHUBResponse = {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  company: string;
  followers: string;
  location: string;
}

type GITHUBInssuesResponse = {
  id: number;
  node_id: string;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
}

export function Description() {
    const [search, setSearch] = useState("");
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");
    const [company, setCompany] = useState("");
    const [followers, setFollowers] = useState("");
    const [location, setLocation] = useState("");

    const [repositories, setRepositories] = useState<GITHUBInssuesResponse[]>([]);

    const handleSearch = () => {    
        api
        .get<GITHUBResponse>(`/users/${search}`)
        .then((response) => {
          setLogin(response.data.login);
          setName(response.data.name);
          setBio(response.data.bio);
          setAvatarUrl(response.data.avatar_url);
          setCompany(response.data.company);
          setFollowers(response.data.followers);
          setLocation(response.data.location);
        });

        handleSearchIssues();
      }


      const handleSearchIssues = () => {
        api
          .get<GITHUBInssuesResponse[]>(`/users/${search}/repos`)
          .then((response) => {
            setRepositories(response.data);
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
             <img src={ avatar_url } alt="" style={{ borderRadius: "6px", width: "12rem" }} /> 
                           
            <div style={{ marginTop: '10px', padding: "20px", width: "41rem"  }}>
                <h3 style={{ alignItems: "center", color:"#3294f8", fontSize: "25px" }}> { name } </h3>

                 <h3 style={{ marginTop: '10px', color: "#5d6e80" }}>{ bio }</h3>

                <div style={{ display: "flex", marginTop: '20px', padding: "2px", justifyContent: 'space-evenly'}} >
                            <GithubLogo  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: '-6px' }}> { login }</h3>
                            <Buildings  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: '-6px' }}>  { company } </h3>      
                            <UserCirclePlus  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: '-6px'  }}> { followers } seguidores</h3>
                            <MapPin  size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: '-6px'  }}> { location }</h3>
                            <Stack size={32} style={{ color: "#5d6e80" }} /><h3 style={{ marginTop: "5px", color: "#5d6e80", marginLeft: '-6px'  }}> { repositories.length }</h3>
                
                </div>
            
            </div>

            <strong style={{ color:"#3294f8", marginTop: "-80px", marginLeft: "160px", fontSize: "20px" }} ><a href={`https://github.com/${login}`} target="_blank" rel="guthub"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" fill="#3294f8"  style={{ marginLeft: "80px"}} viewBox="0 0 256 256"><path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z"></path></svg><p style={{ marginTop: "-26.5px", color:"#3294f8", textDecoration: "none" }}>GITHUB</p> </a> 
            </strong>
             </> 
            )
            }
        </header>
      </DescriptionCard>
            <div>
                <h1>Digite seu perfil no GITHUB</h1>  <br />
                <Input                 
                    type="text" 
                    placeholder='Digite um username' 
                    onChange={(e) => setSearch(e.target.value)}
                
                />
              
                <Button onClick={handleSearch} >Buscar</Button>
            </div>
            <br />

           { repositories.length > 0 ? (
                     <CardIssuesContainer>
                        {
                            repositories.map((repo) => (
                            <a style={{ textDecoration: "none", color: "#cccc" }} href={repo.html_url} target='_blank'>      
                              <CardIssues variant="green">
                                 <header>          
                                                    
                                    <h1>{! repo.name ? (
                                      <h1>Nenhum Nome encontrado</h1>
                                    ) : (   repo.name ) }</h1><br /><br />
                                    <h5>{! repo.created_at ? (
                                      <h1>Nenhuma data encontrada</h1>
                                    ) : (   repo.created_at ) }</h5><br /><br />
                                    <p>{! repo.description ? (
                                      <h1>Nenhuma descrição encontrada</h1>
                                    ) : (   repo.description ) }</p>
                                  </header>
                              </CardIssues>  </a>
                            ))
                        }
                     </CardIssuesContainer>
                ) : (
                    <p>Carregando repositórios...</p>
                )

              }
             
    </DescriptionContainer>
  )
}