import { Field, Form, Formik } from 'formik';
import { TextInput } from '../Input';
import { createPropertySchema } from '../../utils/schema';
import { ICreatePropertyInput, IProperty } from '../../types';
import { usePropertyState } from '../../context';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ICreateProp {
    data?: IProperty;
    closeModal: () => void;
}

const CreateProperty = ({ data, closeModal }: ICreateProp) => {
    const { createProperty, loading, editProperty } = usePropertyState();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [lastCheckin, setLastCheckin] = useState<string | null>(null);
    const [lastCheckout, setLastCheckout] = useState<string | null>(null);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    console.log(data)
    useEffect(() => {
        if (data) {
            // Set initial values for dates
            const bookingLength = data.bookings?.length || 0;
            if (bookingLength > 0) {
                setLastCheckin(data.bookings[bookingLength - 1].checkin ? formatDateForInput(data.bookings[bookingLength - 1].checkin) : null);
                setLastCheckout(data.bookings[bookingLength - 1].checkout ? formatDateForInput(data.bookings[bookingLength - 1].checkout) : null);
            }

            setExistingImages(data.images.map((data)=> data.secure_url) || []);
        }
    }, [data]);

    const formatDateForInput = (dateString: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    };

    const handleSubmit = async (values: ICreatePropertyInput) => {
        console.log("Form Values:", values);

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            const typedKey = key as keyof ICreatePropertyInput;

            if (typedKey === 'images') {
                values.images.forEach((image: File) => {
                    formData.append('images', image);
                });
            } else {
                formData.append(typedKey, String(values[typedKey]));
            }
        });

        console.log("FormData Content:", [...formData]);

        if (data) {
            await editProperty(data._id, formData);
            closeModal();
            return;
        }
        await createProperty(formData);
        closeModal();
    };

    return (
        <Formik
            initialValues={{
                title: data?.title || "", // Use data if available
                description: data?.description || "",
                price: data?.price || 0,
                location: data?.location || "",
                images: [] as File[], // Keep this empty for new property
                propertyType: data?.propertyType || "",
                guestCapacity: data?.guestCapacity || 1,
                bedrooms: data?.bedrooms || 1,
                privateBed: data?.privateBed || 1,
                minimumNights: data?.minimumNights || 1,
                maximumNights: data?.maximumNights || 1,
                amenities: data?.amenities?.join(", ")  || "",
                checkin: lastCheckin || "",
                checkout: lastCheckout|| "",
            }}
            onSubmit={handleSubmit}
            validationSchema={createPropertySchema}
        >
            {({ setFieldValue, errors }) => {
                console.log(errors);
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
                                label="Price"
                                placeholder="Price"
                                as={TextInput}
                                customStyle="placeholder:text-black text-black opacity-60"
                                containerClass="bg-black/5 border-black/50 text-black"
                            />
                            <Field
                                name="location"
                                placeholder="Location"
                                label="Location"
                                as={TextInput}
                                customStyle="placeholder:text-black text-black opacity-60"
                                containerClass="bg-black/5 border-black/50 text-black"
                            />
                            <div>
                                Images
                            </div>
                            {!data && <input
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
                            />}
                            <div className="image-preview flex gap-3">
                                {existingImages.map((image, index) => (
                                    <div key={index} className="">
                                        <img src={image} alt={`Selected ${index}`} className="w-[60px] h-[60px] rounded-xl" />
                                    </div>
                                ))}
                            </div>
                            <div className="image-preview flex gap-3">
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="">
                                        <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} className="w-[60px] h-[60px] rounded-xl" />
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
                                label="Bedrooms"
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
                                label="Amenities" // Fixed typo from "Amenitied" to "Amenities"
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