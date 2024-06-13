import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  // USERS CRUD
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage
  // const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the payload
  // const userRole = decodedToken.roles;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cus, setCus] = useState([]);
  const [users, setusers] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const totalPages = Math.ceil(cus.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);
  const [form, setForm] = useState({});

  const fetchUsers = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get(
          `http://localhost:3000/users?pageNumber=${currentPage}&pageSize=${itemsPerPage}`,
          { headers }
        )
        .then((res) => {
          setusers(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const getCus = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get("http://localhost:3000/users", { headers })
        .then((res) => {
          setCus(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const Delete = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .delete(`http://localhost:3000/users/${id}`, { headers })
        .then((res) => {
          setusers(users.filter((user) => user._id !== id));
          toast({
            title: "Account Deleted.",
            description: "We've Deleted The Account From the Database.",
            status: "success",
            duration: 4000,
            isClosable: true,
            colorScheme: "red",
          });
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const Add = async (form, setForm) => {
    const headers = { Authorization: `Bearer ${token}` };

    form.Number = parseInt(form.Number, 10);

    const emailExists = users.some((user) => user.Email === form.Email);

    if (emailExists) {
      setErrors({ Email: ["Email is already in use."] });
      return;
    }
    try {
      const response = await axios
        .post("http://localhost:3000/users", form, { headers })
        .then((res) => {
          setusers([...users, res.data]);

          toast({
            title: "Account created.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
        });
      return true;
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const Update = async (form, setForm, id) => {
    const {
      _id,
      roles,
      linkedDevice,
      createdAt,
      updatedAt,
      __v,
      ...updateData
    } = form;

    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .patch(`http://localhost:3000/users/${id}`, updateData, { headers })
        .then((res) => {
          console.log(res.data);
          toast({
            title: "Account Updated.",
            description: "User Account Has Been Updated.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
          fetchUsers();
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const FindOne = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get(`http://localhost:3000/users/${id}`, { headers })
        .then((res) => {
          setUser(res.data);
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const Search = async (query) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .post(
          `http://localhost:3000/users/Search?key=${query}`,
          {},
          { headers }
        )
        .then((res) => {
          setusers(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // DEVICES CRUD

  const [devices, setDevices] = useState([]);
  const [Pages, setPages] = useState([]);
  const [device, setDevice] = useState({});

  const totalPagesD = Math.ceil(devices.length / itemsPerPage);
  const currentItemsD = Pages.slice(startIndex, endIndex);

  const fetchDevices = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get(
          `http://localhost:3000/devices?pageNumber=${currentPage}&pageSize=${itemsPerPage}`,
          { headers }
        )
        .then((res) => {
          console.log(res.data);
          setPages(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getDevices = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get("http://localhost:3000/devices", { headers })
        .then((res) => {
          setDevices(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const SearchDevice = async (query) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .post(
          `http://localhost:3000/devices/Search?key=${query}`,
          {},
          { headers }
        )
        .then((res) => {
          setPages(res.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const DeleteDevice = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .delete(`http://localhost:3000/devices/${id}`, { headers })
        .then((res) => {
          setPages(devices.filter((device) => device._id !== id));
          toast({
            title: "Device Deleted.",
            description: "We've Deleted The Device From the Database.",
            status: "success",
            duration: 4000,
            isClosable: true,
            colorScheme: "red",
          });
          fetchDevices();
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const AddDevice = async (form, setForm) => {
    const RefExists = devices.some((device) => device.Ref === form.Ref);

    if (RefExists) {
      setErrors({ Email: ["Ref is already in use."] });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .post("http://localhost:3000/devices", form, { headers })
        .then((res) => {
          console.log(res.data);
          setPages([...devices, res.data]);

          toast({
            title: "Device created.",
            description: "Device Has Been Added.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
          fetchDevices();
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const UpdateDevice = async (form, setForm, id) => {
    const { _id, Status, roles, createdAt, updatedAt, __v, ...updateData } =
      form;

    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .patch(`http://localhost:3000/devices/${id}`, updateData, { headers })
        .then((res) => {
          console.log(res.data);
          toast({
            title: "Device Updated.",
            description: "Device Has Been Updated.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
          fetchDevices();
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const FindDevice = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get(`http://localhost:3000/devices/${id}`, { headers })
        .then((res) => {
          setDevice(res.data);
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  //AUTH

  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [formAdmin, setFormAdmin] = useState({});

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/all-admins",
          { headers }
        );
        setAdmins(response.data);
      } catch (err) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    formAdmin.Number = parseInt(formAdmin.Number, 10);

    const emailExists = admins.some((admin) => admin.Email === formAdmin.Email);

    if (emailExists) {
      setErrors({ Email: ["Email is already in use."] });
      return;
    }
    try {
      const response = await axios
        .post("http://localhost:3000/auth/SignUp", formAdmin, { headers })
        .then((res) => {
          setAdmins([...admins, res.data]);

          toast({
            title: "Account created.",
            description: "Admin Account Has Been Added.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        });
      setFormAdmin({});
      return true;
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const UpdateAdmin = async (
    formAdmin,
    setFormAdmin,
    id,
    token,
    setErrors,
    onClose,
    setAdmins
  ) => {
    const { _id, roles, createdAt, updatedAt, __v, ...updateData } = formAdmin;
    updateData.Number = parseInt(formAdmin.Number, 10);

    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/update-admin/${id}`,
        updateData,
        { headers }
      );
      console.log(response.data);
      toast({
        title: "Admin Updated.",
        description: "Admin Account Has Been Updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setErrors({});
      setFormAdmin({});
      onClose();

      // Update the admins list
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) => (admin._id === id ? response.data : admin))
      );
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const FindAdmin = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios
        .get(`http://localhost:3000/users/Admin/${id}`, { headers })
        .then((res) => {
          setAdmin(res.data);
        });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  //STATISTICS
  const [usersCount, setUsersCount] = useState(null);
  const [newusersCount, setNewUsersCount] = useState(null);
  const [deviceCount, setDeviceCount] = useState(null);
  const [newdeviceCount, setNewDeviceCount] = useState(null);
  const [UnAssignedDevice, setUnAssignedDevice] = useState(null);
  const [AssignedDevice, setAssignedDevice] = useState(null);
  const [userData, setUserData] = useState([]);
  const [GenderData, setGenderData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);

  //Users
  const UsersNumber = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get("http://localhost:3000/users/count", {
        headers,
      });
      setUsersCount(response.data.Users_Number);
    } catch (err) {
      console.error("Error fetching device count:", error);
    }
  };
  const NewUsersNumber = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/users/new-users",
        {
          headers,
        }
      );
      setNewUsersCount(response.data.newUsersCount);
    } catch (err) {
      console.error("Error fetching device count:", error);
    }
  };
  const User_device = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/users/users-device",
        {
          headers,
        }
      );
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching device count:", error);
    }
  };

  //Devices
  const DevicesNumber = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get("http://localhost:3000/devices/count", {
        headers,
      });
      setDeviceCount(response.data.Devices_Number);
    } catch (err) {
      console.error("Error fetching device count:", err);
    }
  };
  const NewDevicesNumber = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/devices/new-Devices",
        {
          headers,
        }
      );
      setNewDeviceCount(response.data.newDevicesCount);
    } catch (err) {
      console.error("Error fetching device count:", err);
    }
  };
  const AssignedDevices = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/devices/Assigned-count",
        {
          headers,
        }
      );
      setAssignedDevice(response.data);
    } catch (err) {
      console.error("Error fetching device count:", err);
    }
  };
  const OffilneDevices = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        " http://localhost:3000/devices/UnAssigned-count",
        {
          headers,
        }
      );
      setUnAssignedDevice(response.data);
    } catch (err) {
      console.error("Error fetching device count:", err);
    }
  };
  const TypeChart = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/devices/type-stat",
        {
          headers,
        }
      );
      setDeviceData(response.data);
    } catch (err) {
      console.error("Error fetching type chart:", err);
    }
  };
  const GenderChart = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        "http://localhost:3000/users/gender-stat",
        {
          headers,
        }
      );
      setGenderData(response.data); // Assuming data has gender property
    } catch (err) {
      console.error("Error fetching gender chart:", err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        //Users
        fetchUsers,
        users,
        Search,
        Delete,
        isOpen,
        onOpen,
        onClose,
        errors,
        setErrors,
        Add,
        FindOne,
        user,
        setUser,
        Update,
        currentPage,
        itemsPerPage,
        totalPages,
        currentItems,
        setCurrentPage,
        getCus,
        // userRole,
        //DEVICES
        devices,
        getDevices,
        setDevices,
        SearchDevice,
        DeleteDevice,
        AddDevice,
        UpdateDevice,
        FindDevice,
        device,
        fetchDevices,

        totalPagesD,
        currentItemsD,

        Pages,
        //AUTH
        addAdmin,
        FindAdmin,
        admin,
        formAdmin,
        setFormAdmin,
        UpdateAdmin,
        form,
        setForm,
        //Statistics
        UsersNumber,
        usersCount,
        NewUsersNumber,
        newusersCount,
        DevicesNumber,
        NewDevicesNumber,
        deviceCount,
        newdeviceCount,
        AssignedDevices,
        OffilneDevices,
        UnAssignedDevice,
        AssignedDevice,
        User_device,
        userData,
        GenderChart,
        TypeChart,
        GenderData,
        deviceData,
        token,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
