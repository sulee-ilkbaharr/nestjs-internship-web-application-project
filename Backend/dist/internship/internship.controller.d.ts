import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { Internship } from './Internship.entity';
import { UpdateInternshipStatusDto } from './dto/update-internship-status.dto';
import { InternshipsService } from './internships.service';
export declare class InternshipController {
    private internshipsService;
    constructor(internshipsService: InternshipsService);
    getInternships(filterDto: GetInternshipFilterDto): Promise<Internship[]>;
    getInternshipById(id: string): Promise<Internship>;
    createInternship(createInternshipDto: CreateInternshipDto): Promise<Internship>;
    deleteInternship(id: string): Promise<void>;
    updateInternshipStatus(id: string, updateInternshipStatusDto: UpdateInternshipStatusDto): Promise<Internship>;
}
