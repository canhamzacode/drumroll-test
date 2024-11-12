import { Field, Form, Formik } from 'formik';
import { TextInput } from '../Input';
import { createPropertySchema } from '../../utils/schema';
import { ICreatePropertyInput } from '../../types';
import { usePropertyState } from '../../context';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const CreateProperty = () => {
    const { createProperty, loading } = usePropertyState();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleSubmit = async (values: ICreatePropertyInput) => {
      console.log("Form Values:", values);
  
      const formData = new FormData();
      Object.keys(values).forEach(key => {
          const typedKey = key as keyof ICreatePropertyInput;
  
          if (typedKey === 'images') {
              values.images.forEach((image: File) => {
                  formData.append('images', image); // Append each image file
              });
          } else {
              formData.append(typedKey, String(values[typedKey])); // Convert non-file values to string
          }
      });
  
      console.log("FormData Content:", [...formData]);
  
      // Ensure `createProperty` handles formData properly
      await createProperty(formData);
  };

    return (
        <Formik 
            initialValues={{
                title: "",
                description: "",
                price: 0,
                location: "",
                images: [] as File[],
                propertyType: "",
                guestCapacity: 1,
                bedrooms: 1,
                privateBed: 1,
                minimumNights: 1,
                maximumNights: 1,
                amenities: "",
                checkin: "",
                checkout: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={createPropertySchema}
        >
          {({ setFieldValue, errors }) => {
            console.log(errors)
              return (
                  <Form className=''>
                      <div className="grid gap-4">
                          <Field
                              name="title"
                              placeholder="Title"
                              as={TextInput}
                              label="Title"
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="description"
                              placeholder="Description"
                              label="Description"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field 
                            name="checkin"
                            placeholder="Check In"
                            label="Checkin"
                            as={TextInput}
                            type="date"
                            customStyle="placeholder:text-black text-black opacity-60"
                            containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field 
                            name="checkout"
                            placeholder="Check Out"
                            label="Check Out"
                            as={TextInput}
                            type="date"
                            customStyle="placeholder:text-black text-black opacity-60"
                            containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="price"
                              type="number"
                              label="price"
                              placeholder="Price"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="location"
                              placeholder="Location"
                              lael="Location"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <div>
                            Images
                          </div>
                          <input
                              type="file"
                              name="images"
                              multiple
                              onChange={(event) => {
                                  const files = event.currentTarget.files;
                                  if (files) {
                                    const newImages = Array.from(files);
                                    setSelectedImages(newImages);
                                    setFieldValue("images", newImages);
                                }
                              }}
                          />
                          <div className="image-preview flex gap-3">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="">
                                    <img  src={URL.createObjectURL(image)} alt={`Selected ${index}`} className="w-[60px] h-[60px] rounded-xl" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedImages = selectedImages.filter((_, i) => i !== index);
                                            setSelectedImages(updatedImages);
                                            setFieldValue("images", updatedImages);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                          </div>
                          <Field
                              name="propertyType"
                              placeholder="Property Type"
                              label="Property Type"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="guestCapacity"
                              type="number"
                              placeholder="Guest Capacity"
                              label="Guest Capacity"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="bedrooms"
                              type="number"
                              placeholder="Bedrooms"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="privateBed"
                              type="number"
                              placeholder="Private Bed"
                              label="Private Bed"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="minimumNights"
                              type="number"
                              placeholder="Minimum Night"
                              label="Minimum Night"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="maximumNights"
                              type="number"
                              placeholder="Maximum Night"
                              label="Maximum Night"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <Field
                              name="amenities"
                              placeholder="Amenities (comma separated)"
                              label="Amenitied"
                              as={TextInput}
                              customStyle="placeholder:text-black text-black opacity-60"
                              containerClass="bg-black/5 border-black/50 text-black"
                          />
                          <button disabled={loading} type='submit' className="w-full max-w-[380px] h-[54px] bg-[#3B71FE] rounded-2xl text-white">
                              {loading ? <Loader2 /> : "Create Property"}
                          </button>
                      </div>
                  </Form>
              );
          }}
        </Formik>
    );
};

export default CreateProperty;