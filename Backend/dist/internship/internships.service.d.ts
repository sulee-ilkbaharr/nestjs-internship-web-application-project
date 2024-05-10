import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { InternshipRepository } from './internships.repository';
import { Internship } from './Internship.entity';
import { InternshipStatus } from './internship-status.enum';
export declare class InternshipsService {
    private readonly internshipsRepository;
    constructor(internshipsRepository: InternshipRepository);
    getInternships(filterDto: GetInternshipFilterDto): Promise<Internship[]>;
    getIntershipById(id: string): Promise<Internship>;
    createInternship(createInternshipDto: CreateInternshipDto): Promise<Internship>;
    deleteInternship(id: string): Promise<void>;
    updateInternshipStatus(id: string, status: InternshipStatus): Promise<Internship>;
}
