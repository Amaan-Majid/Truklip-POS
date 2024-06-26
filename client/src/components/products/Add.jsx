import { Button, Form, Input, Modal, Select, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
}) => {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product successfully added.");
      setIsAddModalOpen(false);
      form.resetFields();
      setProducts([
        ...products,
        {
          _id: Math.random(),
          title: value.title,
          img: value.img,
          price: Number(value.price),
          category: value.category,
          truklipId: value.truklipId,
          nftCompatible: value.nftCompatible,
          unitQuantity: value.unitQuantity,
          barcode: value.barcode,
          subCategory: value.subCategory,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add New Product"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label={"Product Name"}
          name="title"
          rules={[
            {
              required: true,
              message: "This field cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label={"Product Image Link"}
          name="img"
          rules={[
            {
              required: true,
              message: "This field cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Enter product image link" />
        </Form.Item>
        <Form.Item
          label={"Product Price"}
          name="price"
          rules={[
            {
              required: true,
              message: "This field cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Enter product price" type="number" />
        </Form.Item>
        <Form.Item
          label={"Truklip ID"}
          name="truklipId"
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input placeholder="Enter truklip Id" />
        </Form.Item>

        <Form.Item
          label={"Select Category"}
          name="category"
          rules={[
            {
              required: true,
              message: "This field cannot be empty!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Type to select category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories.map((item, i) => {
              return { value: item.title, label: item.title };
            })}
          />
        </Form.Item>
        <Form.Item
          label={"Sub Category"}
          name="subCategory"
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input placeholder="Enter sub category" />
        </Form.Item>
        <Form.Item
          label={"NFT Comaptibility"}
          name="nftCompatibility"
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input placeholder="yes/no" />
        </Form.Item>
        <Form.Item
          label={"Unit Quantity"}
          name="unitQuantity"
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input placeholder="Enter unit quantity" />
        </Form.Item>
        <Form.Item
          label={"Barcode"}
          name="barcode"
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input placeholder="Enter barcode" />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
