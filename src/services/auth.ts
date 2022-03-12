import { Unauthorized } from "http-errors"
import { Inject } from "@/utils/di"
import JwtService from "@/services/jwt"
import AdminService from "@/services/admin"
import { Catch } from "@/utils/error"

@Inject()
export default class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) { }

    // Authenticate admin
    @Catch(new Unauthorized("Invalid credentials"))
    public async authenticate(email: string, password: string) {
        const admin = await this.adminService.findOrFail(email, password)

        const token = await this.jwtService.signSession(admin.get().id)
        return token
    }

    // Verify admin
    @Catch()
    public async verify(token: string) {
        const { id } = await this.jwtService.verifySession(token)

        const admin = await this.adminService.findByIdOrFail(id)
        return admin
    }
}
