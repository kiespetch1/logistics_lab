import CalendarWidget from '@/app/components/widgets/CalendarWidget';
import RadioWidget from '@/app/components/widgets/RadioWidget';
import TRexGameWidget from '@/app/components/widgets/TRexGameWidget';
import WeatherWidget from '@/app/components/widgets/WeatherWidget';
import {Metadata} from 'next';
import ClockWidget from '@/app/components/widgets/ClockWidget';
import CurrencyWidget from "@/app/components/widgets/CurrencyWidget";
import NewYearWidget from "@/app/components/widgets/NewYearWidget";
import MapWidget from "@/app/components/widgets/MapWidget";
import CalculatorWidget from "@/app/components/widgets/CalculatorWidget";

export const metadata: Metadata = {
    title: 'Полезные виджеты',
};

const WidgetsPage = () => (
    <div className="pb-8">
        <h1 className="mb-8 mt-10 text-center text-3xl font-semibold">
            Полезные виджеты
        </h1>

        <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-8">
                <WeatherWidget/>
                <ClockWidget/>
            </div>

            <div className="flex w-full justify-center gap-4">
                <div className="max-w-[50rem] basis-[50rem]">
                    <CalendarWidget/>
                </div>
                    <RadioWidget/>
            </div>
            <div className="flex w-full justify-center gap-4">
                <TRexGameWidget/>
            </div>
            <div className="flex w-full justify-center gap-4">
                <MapWidget/>
                <CalculatorWidget/>
            </div>
            <div className="flex w-full justify-center gap-4">
                <CurrencyWidget/>
                <NewYearWidget/>
            </div>
        </div>
    </div>
);

export default WidgetsPage;
