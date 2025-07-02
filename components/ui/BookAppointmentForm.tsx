'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    type: z.string(),
    message: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const BookAppointmentForm = ({
    title = 'Book An Appointment',
    bgColor = 'bg-[#F2F6FC]',
    textColor = 'text-black',
}: {
    title?: string;
    bgColor?: string;
    textColor?: string;
}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            type: '',
            message: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Form data:', data);
            // Here you would typically send the data to your API
            // await submitForm(data);

            // Reset form after successful submission
            form.reset();
            alert('Appointment request submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <div className={`${bgColor} rounded-2xl p-8 w-full h-full max-w-xl mx-auto flex flex-col gap-6`}>
            <h2 className={`text-3xl font-bold ${textColor}`}>{title}</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`font-semibold ${textColor} text-base`}>
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`font-semibold ${textColor} text-base`}>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`font-semibold ${textColor} text-base`}>
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`font-semibold ${textColor} text-base`}>
                                    Type of Accident <span className="text-xs text-gray-200">(If Applicable)</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Workplace Accident">Workplace Accident</SelectItem>
                                        <SelectItem value="Car Accident">Car Accident</SelectItem>
                                        <SelectItem value="Personal Injury">Personal Injury</SelectItem>
                                        <SelectItem value="Truck Accident">Truck Accident</SelectItem>
                                        <SelectItem value="Motorcycle Accident">Motorcycle Accident</SelectItem>
                                        <SelectItem value="Slip and Fall">Slip and Fall Accident</SelectItem>
                                        <SelectItem value="Pedestrian Accident">Pedestrian Accident</SelectItem>
                                        <SelectItem value="Workers Compensation">Workers Compensation</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`font-semibold ${textColor} text-base`}>
                                    Message
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your message"
                                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#D52128] hover:bg-[#b81b22] text-white font-bold py-3 px-4 rounded-xl text-lg transition duration-300 mt-2"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default BookAppointmentForm; 