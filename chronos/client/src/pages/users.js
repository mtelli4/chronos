import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from "../services/authService";
import "../css/styleUsers.css"
import ChronosInputSelect from '../components/ChronosInputSelect';
import ChronosButton from '../components/ChronosButton';

const UserList = ({setHeaderVisibility}) => {
  React.useEffect(() => {
    setHeaderVisibility();
  });

  const [users, setUsers] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [sortedStudents, setSortedStudents] = useState([]);
  const [secretaries, setSecretaries] = useState([]);
  const [formations, setFormations] = useState([])
  const [view, setView] = useState('Admin'); // Initialize view state
  const [roleId, setRoleId] = useState(null); // Initialize roleId state
  const role = authService.getCurrentRole();
  const [userEmail, setUserEmail] = useState();
  const [userRoles, setUserRoles] = useState();
  const [currentRole, setCurrentRole] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const roles = authService.getUserRoles()
    setUserRoles(roles)
  
    const currentRole = authService.getCurrentRole()
    setCurrentRole(currentRole)
  
    const email = authService.getUserEmail()
    setUserEmail(email)

    const userId = authService.getUserId()
    setUserId(userId);

    const roleId = authService.getCurrentRoleId();
    setRoleId(roleId);

    fetchData(currentRole, userId);
  }, []);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
  
    // Mettre à jour le local storage avec le nouveau rôle sélectionné
    authService.setCurrentRole(selectedRole);
    setCurrentRole(selectedRole);
  
    authService.setCurrentRoleId(userRoles[selectedRole]);
    
    // Adjust view based on the new role
    switch (selectedRole) {
      case 'ROLE_SUPERADMIN':
      case 'ROLE_ADMIN':
        // Set default view for admins
        setView('Admin');
        break;
      default:
        // Set default view for other roles
        setView('eleves');
        break;
    }
  };

  const handleSortByFormation = async (event) => {
    const selectedFormationId = event.target.value;

    if (selectedFormationId !== "none") {
      const filteredStudents = students.filter(student => student.formationId && student.formationId.toString() === selectedFormationId);
      setSortedStudents(filteredStudents);
    } else {
      setSortedStudents(students);
    }
  }

  const fetchData = async (currentRole, userId) => {
    try {
      const [usersResponse, professorsResponse, studentsResponse, secretariesResponse, formationsResponse] = await Promise.all([
        axios.get('http://localhost:5000/utilisateurs'),
        axios.get('http://localhost:5000/professeurs', {
          params: {
            joinUsers: true,
          },
        }),
        axios.get('http://localhost:5000/eleves', {
          params: {
            joinUsers: true,
            joinFormations: true
          },
        }),
        axios.get('http://localhost:5000/secretaires', {
          params: {
            joinUsers: true,
          },
        }),
        axios.get('http://localhost:5000/formations', {
          params: {
            isSecretaire: currentRole == "ROLE_SECRETARY",
            utilisateurId: userId,
          },
        })
      ]);

      setUsers(usersResponse.data);
      setProfessors(professorsResponse.data);
      setStudents(studentsResponse.data);
      console.log(studentsResponse.data)
      setSortedStudents(studentsResponse.data);
      setSecretaries(secretariesResponse.data);
      setFormations(formationsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      await axios.update(`/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const getUsersByView = () => {
    switch (view) {
      case 'prof':
        return professors;
      case 'eleves':
        return sortedStudents;
      case 'secretaires':
        return secretaries;
      default:
        return users;
    }
  };

  return (
    <div className='usersCont'>
      <h1 className='usersTitle'>Liste des utilisateurs</h1>
      <div className='usersForm'>
        <label htmlFor="view-select">Vue :</label>
        <select id="view-select" value={view} onChange={handleViewChange}>
          {['ROLE_SUPERADMIN', 'ROLE_ADMIN'].includes(role) && <option value="Admin">Admin</option>}
            <option value="prof">Professeurs</option>
            <option value="eleves">Élèves</option>
          {['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_DIRECTOR', 'ROLE_DEPARTMENT_DIRECTOR'].includes(role) && <option value="secretaires">Secrétaires</option>}
        </select>

        {view === 'eleves' && (
          <>
            <label htmlFor="sort-by-formation">Trier par Formation:</label>
            <select id="sort-by-formation" onChange={handleSortByFormation}>
              <option value="none">Aucun</option>
              
              {formations.map(formation => (
                <option key={formation.id} value={formation.id}>{formation.libelle}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <table className='usersTable'>
        <thead>
          <tr>
            <th>id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            {view === 'prof' && <th>Vacataire</th>}
            {view === 'eleves' && <th>Numéro étudiant</th>}
            {view === 'eleves' && <th>Tiers temps</th>}
            {view === 'eleves' && <th>Délégué</th>}
            {view === 'eleves' && <th>Formation</th>}
          </tr>
        </thead>
        <tbody>
          {getUsersByView().map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{view === 'Admin' ? user.nom : user.Utilisateur.nom ?? ''}</td>
              <td>{view === 'Admin' ? user.prenom : user.Utilisateur.prenom ?? ''}</td>
              <td>{view === 'Admin' ? user.email : user.Utilisateur.email ?? ''}</td>
              {view === 'prof' && <td>{user.vacataire ? 'Oui' : 'Non'}</td>}
              {view === 'eleves' && <td>{user.numeroEtudiant ?? ''}</td>}
              {view === 'eleves' && <td>{user.tiersTemps ? 'Oui' : 'Non'}</td>}
              {view === 'eleves' && <td>{user.delegue ? 'Oui' : 'Non'}</td>}
              {view === 'eleves' && <td>{user.Formation.libelle ?? ''}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
