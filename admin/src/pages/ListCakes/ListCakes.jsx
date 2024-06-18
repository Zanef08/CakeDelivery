import React, { useEffect, useState } from "react";
import "./ListCakes.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ListCakes = ({ url }) => {
  const [list, setList] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/cake/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching cakes");
      }
    } catch (error) {
      console.error("Error fetching cakes:", error);
      toast.error("Error fetching cakes.");
    }
  };

  const removeCake = async (cakeId) => {
    try {
      const response = await axios.delete(`${url}/api/cake/remove/${cakeId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error removing cake:", error);
      toast.error("Error removing cake.");
    }
  };

  const openModal = (cake) => {
    setSelectedCake(cake);
    setName(cake.name);
    setDescription(cake.description);
    setPrice(cake.price);
    setCategory(cake.category);
    setImage(null);
    setImageUrl(`${url}/images/${cake.image}`);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCake(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage(null);
    setImageUrl("");
  };

  const updateCake = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${url}/api/cake/update/${selectedCake._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        closeModal();
      } else {
        toast.error("Error updating cake");
      }
    } catch (error) {
      console.error("Error updating cake:", error);
      toast.error("Error updating cake.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const truncatePrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  return (
    <div className="list add flex-col">
      <p>All Cakes List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{truncatePrice(item.price)}</p>
            <p onClick={() => removeCake(item._id)} className="cursor">
              X
            </p>
            <Button type="primary" onClick={() => openModal(item)}>
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Edit Cake"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="update"
            type="primary"
            loading={loading}
            onClick={updateCake}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Category">
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              name="image"
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                setImage(file);
                setImageUrl(URL.createObjectURL(file));
                return false;
              }}
            >
              <Button icon={<EditOutlined />}>Change Image</Button>
            </Upload>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Selected Cake"
                style={{ marginTop: 16, maxWidth: "100%" }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListCakes;
