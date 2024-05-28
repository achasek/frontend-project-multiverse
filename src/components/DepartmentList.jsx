import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

export const DepartmentList = ({departments, activeDepartment, setActiveDepartment, getArtListFromDepartment, setArtList}) => {
    return (
        <div>{
            departments.slice(0, 10).map((department) => <ListItem >
                <Button onClick={async () => {
                    setActiveDepartment({
                        departmentId: department.departmentId,
                        displayName: department.displayName
                    });
                    const artList = await getArtListFromDepartment(department.departmentId); 
                    setArtList(artList);
                }}style ={{fontSize:"10px", width:"100px", justifyContent:"left"}}>
                {department.displayName}
                </Button>
                </ListItem>)
        }</div>
    )
}